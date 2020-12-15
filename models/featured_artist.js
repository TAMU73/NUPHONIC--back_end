const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const featuredArtistSchema = Schema({
    artist_id: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Featured Artist', featuredArtistSchema)
