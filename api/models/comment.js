const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    parentCommentId: String,
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    liked: Boolean,
    commented: Boolean
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment