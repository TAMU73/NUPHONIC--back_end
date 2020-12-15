const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const songSchema = Schema({
    song_name: {
        type: String,
        required: true
    },
    published_date: {
        type: Date,
        default: Date.now()
    },
    song_url:  {
        type: String,
        require: true
    },
    song_cover_url:  {
        type: String,
        require: true
    },
    genre_name: {
        type: String,
        required: true
    },
    artist_id: {
        type: String,
        required: true
    },
    album_id: {
        type: String,
        default: 'Single'
    },
    song_description: {
        type: String,
        require: true
    },
    song_lyrics: {
        type: String,
        default: null
    },
})

module.exports = mongoose.model('song', songSchema)
