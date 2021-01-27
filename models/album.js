const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const albumSchema = Schema({
    album_name: {
        type: String,
        required: true
    },
    artist_id: {
        type: String,
        required: true
    },
    artist_name:  {
        type: String,
        require: true
    },
    album_picture:  {
        type: String,
        require: true
    },
    album_songs: {
        type: Array
    },
    album_description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('album', albumSchema)
