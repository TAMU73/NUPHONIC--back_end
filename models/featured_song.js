const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const featuredSongSchema = Schema({
    song_id: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Featured Song', featuredSongSchema)
