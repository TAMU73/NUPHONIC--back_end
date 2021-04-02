const SuggestedFeature = require('../models/suggested_feature')

const functions = {
    suggest_feature: async function(req, res) {
        if(!req.body.feature_name || !req.body.user_id || !req.body.feature_description) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else {
            var newFeature = SuggestedFeature({
                feature_name: req.body.feature_name,
                feature_description: req.body.feature_description,
                suggested_by: req.body.user_id
            })
            newFeature.save(function(err, feature){
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in suggesting feature!!",
                        err: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Thank you for suggesting feature.",
                        genre: feature
                    })
                
                }
            })
        }
    },
}

module.exports = functions