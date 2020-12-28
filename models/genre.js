const mongoose = require('mongoose')
const random = require('mongoose-simple-random')

const Schema = mongoose.Schema;
const genreSchema = Schema({
    genre_name: {
        type: String,
        required: true
    },
    genre_color :{
        type: String,
        required: true
    },
    genre_picture_url: {
        type: String,
        required: true
    }
})
genreSchema.plugin(random)

module.exports = mongoose.model('Genre', genreSchema)
