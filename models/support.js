const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const supportModel = Schema({
    supporter_id: {
        type: String,
        required: true
    },
    supporter_name: {
        type: String,
        default: true
    },
    supporter_profile_picture:  {
        type: String,
        require: true
    },
    supported_amount:  {
        type: Number,
        require: true
    },
    supported_date: {
        type: Date,
        default: Date.now()
    },
    supported_song :{
        type: Map,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    payment_method :{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('support', supportModel)
