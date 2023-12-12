const { authenticateToken } = require('../controllers/auth.controller')
const Post = require('../models/post')
const cookie = require('cookie');
const User = require('../models/user');
const Follow = require('../models/follow');
const Like = require('../models/like');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header();
      next();
    });

app.get('/posts/feed/:userid', async (req, res) => {
    const postSet = await Post.find().sort({ timestamp: -1 })

    if (req.params.userid) {
        for (const post of postSet) {
            const likeDoc = await Like.findOne({ postId: post.id, userId: req.params.userid })
    
            if (likeDoc) {
                post.liked = true
            } else {
                post.liked = false
            }
        }
    }

    res.json(postSet)
})

app.get('/posts/:id', async (req, res) => {
    const sortedPosts = await Post.find().sort({ timestamp: -1 })
    const posts = sortedPosts.filter((post) => post.userId === req.params.id)

    res.json(posts)
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    
    res.json(post)
})

app.get('/posts/follow/:id', async (req, res) => {
    const followingObject = await Follow.find({ followerId: req.params.id })
    const followingMap = followingObject.map(following => following.followingId)

    const sortedPosts = await Post.find().sort({ timestamp: -1 })
    const posts = sortedPosts.filter((post) => followingMap.includes(post.userId))

    res.json(posts)
})

app.post('/posts', authenticateToken, async (req, res) => {       
    const user = await User.findOne({ userId: req.body.userId })

    const post = new Post({
        content: req.body.content,
        userId: user.userId,
        user: user.user,
        profilepic: user.profilepic,
        timestamp: Date.now()
    })

    post.save()

    res.json(post)
})

app.post('/like', authenticateToken, async (req, res) => {
    const like = new Like({ postId: req.body.postId, userId: req.body.userId })
    
    like.save()

    const likeCounter = await Post.findOne({ _id: req.body.postId })

    likeCounter.$inc('likes', 1)

    await likeCounter.save()

    res.send('posted')
})

app.put('/post/:id', async (req, res) => {
    const posts = await Post.findOne({ _id: req.params.id })
    
    res.send('Edit Post' + req.params.id)
})

app.delete('/post/:id', authenticateToken, async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id })
    
    res.send('Delete Post')
})

app.delete('/like', authenticateToken, async (req, res) => {
    const deleted = await Like.findOneAndDelete({ postId: req.body.postId, userId: req.body.userId })

    const likeCounter = await Post.findOne({ _id: req.body.postId })

    likeCounter.$inc('likes', -1)

    await likeCounter.save()
    
    res.send('deleted')
})
}