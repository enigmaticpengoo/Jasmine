const mongoose = require('mongoose')

const followersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    followersCount: {
        type: Number,
        default: 0
    },
    followers: [{    
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
            required: true,
            default: 'http://localhost:3000/profilepic.png'
        },
    }]
})

const Followers = mongoose.model('Followers', followersSchema)

module.exports = Followers