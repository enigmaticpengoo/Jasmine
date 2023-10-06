const { authenticateToken } = require('../controllers/auth.controller')
const Post = require('../models/post')
const cookie = require('cookie')

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header();
      next();
    });

app.get('/posts', async (req, res) => {
    const posts = await Post.find().sort({ timestamp: -1 })
    
    res.json(posts)
})

app.get('/user/posts', authenticateToken, async (req, res) => {

    const posts = (await Post.find())
        .filter(post => post.user === req.user.name)
    res.json(posts)
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    
    res.json(post)
})

app.post('/posts', authenticateToken, (req, res) => {       
    console.log(req.body.content)
    const post = new Post({
        content: req.body.content
    })

    post.save()

    res.json(post)
})

app.put('/post/:id', async (req, res) => {
    const posts = await Post.findOne({ _id: req.params.id })
    
    res.send('Edit Post' + req.params.id)
})

app.delete('/post/:id', async (req, res) => {
    const posts = await Post.findOne({ _id: req.params.id })
    
    res.send('Delete Post' + req.params.id)
})
}