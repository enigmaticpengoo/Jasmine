const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilepic: {
        type: String
    },
    coverphoto: String,
    bio: String,
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User