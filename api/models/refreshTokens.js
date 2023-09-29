const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

module.exports = RefreshToken