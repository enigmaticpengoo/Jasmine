const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: { 
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
        default: 'Andrew Falbo',
    },
    profilepic: {
        type: String,
        required: true,
        default: 'http://localhost:3000/profilepic.png'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post