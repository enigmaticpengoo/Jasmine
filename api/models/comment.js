const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
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
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment