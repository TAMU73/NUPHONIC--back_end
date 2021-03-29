const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const favouriteArtistSchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    artist_list: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('Favourite Artist', favouriteArtistSchema)