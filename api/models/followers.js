const mongoose = require('mongoose')

const followersSchema = new mongoose.Schema({
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

const Followers = mongoose.model('Followers', followersSchema)

module.exports = Followers