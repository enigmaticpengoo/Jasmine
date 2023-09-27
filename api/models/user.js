const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    profilepic: {
        type: String,
        default: "http://127.0.0.1:3000/profilepic.png"
    },
    coverphoto: String,
    bio: String,
    follows: {
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