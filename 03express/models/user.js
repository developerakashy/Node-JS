const moongose = require('mongoose')

const userSchema = new moongose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true
    }

}, {timestamps: true})

const User = moongose.model('user', userSchema)

module.exports = User
