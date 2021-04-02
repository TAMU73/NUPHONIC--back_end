const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const favouriteSongSchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    song_list: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('Favourite Song', favouriteSongSchema)