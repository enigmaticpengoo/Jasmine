const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
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

const Like = mongoose.model('Like', likeSchema)

module.exports = Like