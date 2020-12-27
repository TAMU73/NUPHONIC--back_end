const mongoose = require('mongoose')
const random = require('mongoose-simple-random')

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
    song_picture_url:  {
        type: String,
        require: true
    },
    genre_name: {
        type: String,
        required: true
    },
    artist_id :{
        type: String,
        required: true
    },
    artist_username: {
        type: String,
        required: true
    },
    album_id :{
        type: String,
    },
    album_name: {
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
songSchema.plugin(random)

module.exports = mongoose.model('song', songSchema)
