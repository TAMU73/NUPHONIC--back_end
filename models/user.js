const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = Schema({
    profile_picture: {
        type: String,
        default: null
    },
    full_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        require: true
    },
    password:  {
        type: String,
        require: true
    },
    reset_code: {
        type: Number,
        default: null
    },
})

module.exports = mongoose.model('user', userSchema)
