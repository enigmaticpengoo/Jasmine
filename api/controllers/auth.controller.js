const User = require('../models/user')
const RefreshToken = require('../models/refreshTokens')
const cookie = require('cookie')
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv')
const uid = require('uid-safe')
const fs = require('fs')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

app.use(cors())
app.use(express.json())

const signup = async (req, res) => {
  let userId = await uid(18).then(function (string) {
    return string
  })

  const userIdUnique = await User.findOne({
    userId: userId
  })

  if (!userIdUnique) {
    const user = new User({
      userId: userId,
      user: req.body.user,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      profilepic: `http://127.0.0.1:3000/uploads/${userId}/profilepic`
    })

    user.save()

    fs.mkdir(`../client/public/uploads/${userId}`, { rescursive: true }, (err) => {
      if (err) throw err
    })

    fs.copyFile(`../client/public/profilepic.png`, `../client/public/uploads/${userId}/profilepic`, (err) => {
      if (err) throw err
    })

    fs.copyFile(`../client/public/coverphoto.png`, `../client/public/uploads/${userId}/coverphoto`, (err) => {
      if (err) throw err
    })

    res.json({ userId: userId, error: null })
  } else {
    throw new Error('Something went wrong! Please try again.')
  }
};

const login = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (user !== null) {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        const userId = { userId: user.userId }
  
        const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
        const refreshToken = jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET)
  
        const uploadRefreshToken = new RefreshToken({
          value: refreshToken,
          userId: user.userId
        })
        uploadRefreshToken.save()
  
        res.send({ accessToken: accessToken, user })
      } else {
        res.send({ error: 'No account with the given email and password exists'})
      }
    })}

      


async function checkRefreshToken(userId) {
  const refresh = await RefreshToken.findOne({ userId: userId }, 'value')

  jwt.verify(refresh['value'], process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return console.log("refresh token error")
      } else {
        return
      }
    })
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const userId = req.body.userId
    
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      checkRefreshToken(userId)
      if (process.env.ACCESS_TOKEN_SECRET) 
      {
        jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
      }
      next()
    } else {
    next()
    }
  })
}

module.exports = { login, signup, authenticateToken }