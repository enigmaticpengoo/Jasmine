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

app.post('/user/:follower/:following', async (req, res) => {
    const firstResult = await User.findOne({ userId: req.params.following })
    const followers = new Followers({
        userId: firstResult.userId,
        user: firstResult.user,
        profilepic: firstResult.profilepic
    })

    followers.save()

    const followerIncrement = firstResult.followers + 1
    await User.updateOne({ userId: req.params.following }, { followers: followerIncrement})

    const secondResult = await User.findOne({ userId: req.params.follower })
    const following = new Following({
        userId: secondResult.userId,
        user: secondResult.user,
        profilepic: secondResult.profilepic
    })

    following.save()

    const followingIncrement = firstResult.following + 1
    await User.updateOne({ userId: req.params.following }, { following: followingIncrement})    

    const result = { followers, following }

    res.json(result)
})

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