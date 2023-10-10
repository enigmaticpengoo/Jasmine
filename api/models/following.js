const mongoose = require('mongoose')

const followingSchema = new mongoose.Schema({
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
})

const Following = mongoose.model('Following', followingSchema)

module.exports = Following