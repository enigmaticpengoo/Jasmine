const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: { 
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: true,
        default: 'http://localhost:3000/profilepic.png'
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    liked: Boolean
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post