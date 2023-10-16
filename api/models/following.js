const mongoose = require('mongoose')

const followingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    followingCount: {
        type: Number,
        default: 0
    },
    following: [{
        userId: {
            type: String,
            required: true
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
    }]
})

const Following = mongoose.model('Following', followingSchema)

module.exports = Following