const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const suggestedFeatureSchema = Schema({
    feature_name: {
        type: String,
        required: true
    },
    feature_description: {
        type: String,
        required: true
    },
    suggested_by: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Suggested Feature', suggestedFeatureSchema)
