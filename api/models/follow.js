const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({ 
        followerId: {
            type: String,
            required: true
        },
        followerUser: {
            type: String,
            required: true
        },
        followerProfilepic: {
            type: String,
            required: true,
            default: 'http://localhost:3000/profilepic.png'
        },
        followingId: {
            type: String,
            required: true
        },
        followingUser: {
            type: String,
            required: true
        },
        followingProfilepic: {
            type: String,
            required: true,
            default: 'http://localhost:3000/profilepic.png'
        },
})

const Follow = mongoose.model('Follow', followSchema)

module.exports = Follow