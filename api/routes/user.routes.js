const Follow = require('../models/follow');
const RefreshToken = require('../models/refreshTokens');
const User = require('../models/user')
const uid = require('uid-safe')
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })

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

app.get('/search/:query', async (req, res) => {
    const result = await User.find({ user: req.params.query }).exec()

    console.log(result[0])

    if (result[0]) {
        res.json(result)
    } else {
        res.send(false)
    }
})

app.get('/user/following/:following', async (req, res) => {
    const following = await Follow.findOne({ followerId: req.params.following })

    res.json(following)
})

app.get('/user/follower/:follower'), async (req, res) => {
    const follower = await Follow.findOne({ followingId: req.params.follower })

    res.json(follower)
}

app.get('/user/:follower/:following', async (req, res) => {
    if (await Follow.findOne({
            followerId: req.params.follower,
            followingId: req.params.following
        })) {
            res.send(true)
        } else {
            res.send(false)
        }
})

app.post('/user/uploadphoto/:id', upload.single('profilepic'), async (req, res) => {
    console.log(req.file, req.params.id)

    await User.findOneAndUpdate({ userId: req.params.id }, { profilepic: `http://127.0.0.1:3000/uploads/${req.file.filename}` })
    
    res.send('photo uploaded')
})

app.post('/user/:follower/:following', async (req, res) => {
    console.log( req.params )
    const followerUser = await User.findOne({ userId: req.params.follower })
    const followingUser = await User.findOne({ userId: req.params.following })

    const follow = new Follow({
            followerId: followerUser.userId,
            followerUser: followerUser.user,
            followerProfilepic: followerUser.profilepic,
            followingId: followingUser.userId,
            followingUser: followingUser.user,
            followingProfilepic: followingUser.profilepic
        })

    follow.save()

    await User.updateOne({ userId: req.params.follower }, { $inc: { following: 1 }}) 
    await User.updateOne({ userId: req.params.following }, { $inc: { followers: 1 }})   

    res.json(follow)
})

app.delete('/user/:follower/:following', async (req, res) => {
    const unfollow = await Follow.findOneAndDelete({
            followerId: req.params.follower,
            followingId: req.params.following
        })

    await User.updateOne({ userId: req.params.follower }, { $inc: { following: -1 }}) 
    await User.updateOne({ userId: req.params.following }, { $inc: { followers: -1 }})   

    res.json(unfollow)
})

app.delete('/logout', async (req, res) => {
    const token = await RefreshToken.findOneAndDelete({ userId: req.userId })

    res.json(token)
})

app.delete('/user/delete/:email', async (req, res) => {
    const user = await User.deleteOne({ email: req.params.email })

    res.json(user)
})
}