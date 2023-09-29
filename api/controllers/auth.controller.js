const User = require('../models/user')
const RefreshToken = require('../models/refreshTokens')
const cookie = require('cookie')
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

app.use(cors())
app.use(express.json())

const signup = (req, res) => {
  const user = new User({
    user: req.body.user,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  });

  console.log('user created')

  user.save();
};

const login = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then((user) => {
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

      const email = { name: req.body.email }

      const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
      const refreshToken = jwt.sign(email, process.env.REFRESH_TOKEN_SECRET)

      const uploadRefreshToken = new RefreshToken({
        value: refreshToken,
        email: req.body.email
      })
      uploadRefreshToken.save()

      res.send({ accessToken: accessToken })
    });
};

async function checkRefreshToken() {
  const refresh = await RefreshToken.findOne({ email: 'falbokev@gmail.com' }, 'value')

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
    
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('accessToken invalid, checking refresh token')
      checkRefreshToken()
      console.log('setting access token')
      const accessToken = jwt.sign({ name: 'falbokev@gmail.com' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
      console.log('new access token: ' + accessToken)
      res.send({ accessToken: accessToken })
      next()
    } else {
    next()
    }
  })
}

module.exports = { login, signup, authenticateToken }