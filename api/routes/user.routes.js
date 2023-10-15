const Followers = require('../models/followers');
const Following = require('../models/following');
const RefreshToken = require('../models/refreshTokens');
const User = require('../models/user')
const uid = require('uid-safe')

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header();
      next();
    });

app.get('/user/:id', async (req, res) => {
    const user = await User.findOne({ userId: req.params.id })

    res.send(user)
})

app.get('/users', (req, res) => {
    res.json('Users')
})

app.get('/user/test', async (req, res) => {
    let userId = await uid(18).then(function (string) {
        return string
      })
    
    res.json(userId)
})
// app.get('/user/following', async (req, res) => {
//     const user = await User.findOne('req.user')
//     const following = await Following.findOne({ user: user })
    
//     res.json(following)
// })

// app.get('/user/followers', async (req, res) => {
//     const user = await User.findOne('req.user')
//     const followers = await Followers.findOne({ user: user})

//     res.json(followers)
// })

// app.post('/user/follow', (req, res) => {
//     console.log(req.body.user)

//     res.json(req.body.user)
// })

// app.post('/user/signup', (req, res) => {
//     console.log(req.body)
    
//     const user = new User({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email
//     })

//     user.save()
    
//     res.json(user)
// })

app.delete('/logout', async (req, res) => {
    const token = await RefreshToken.findOneAndDelete({ userId: req.userId })

    res.json(token)
})

app.delete('/user/delete/:email', async (req, res) => {
    const user = await User.deleteOne({ email: req.params.email })

    res.json(user)
})
}