const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const suggestedGenreSchema = Schema({
    genre_name: {
        type: String,
        required: true
    },
    genre_description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Suggested Genre', suggestedGenreSchema)
