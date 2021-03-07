const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const playlistSchema = Schema({
    playlist_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    playlist_songs: {
        type: Array
    },
})

module.exports = mongoose.model('playlist', playlistSchema)
