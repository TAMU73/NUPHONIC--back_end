const Support = require('../models/support')

const functions = {
    support_artist: function (req, res) {
        if(!req.body.supporter_id || !req.body.supporter_name || !req.body.supporter_profile_picture || !req.body.supported_amount || !req.body.supported_song|| !req.body.message|| !req.body.payment_method) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else {
            if(req.body.supporter_id == req.body.supported_song['artist_id']) {
                res.status(404).send({
                    success: false,
                    msg: "You cannot super support yourself!!",
                })
            } else {
                var newSupport = Support({
                    supporter_id: req.body.supporter_id,
                    supporter_name: req.body.supporter_name,
                    supporter_profile_picture: req.body.supporter_profile_picture,
                    supported_amount: req.body.supported_amount,
                    supported_song: req.body.supported_song,
                    message: req.body.message,
                    payment_method: req.body.payment_method
                })
                newSupport.save(async function(err,newSupport) {
                    if(newSupport) {
                        res.status(200).send({
                            success: true,
                            msg: "Thank you for super supporting :), keep going.",
                            support: newSupport
                        })
                    } else {
                        res.status(404).send({
                            success: false,
                            msg: "Error in super supporting!!",
                            err: err
                        })
                    }
                })
            }
            
        }
    },

    get_supporters: function (req, res) {
        if(!req.params.id) {
            res.status(404).send({
                success: false,
                msg: "User ID is required!!",
            })
        } else {
            Support.find({
                'supported_song.artist_id': req.params.id,
            }, async function (err, supporters) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in fetching super supporters!!",
                        err: err
                    })
                } else if (!supporters) {
                    res.status(404).send({
                        success: false,
                        msg: "There are no super supporters for you. Please upload more to gain supporters!!",
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Successfully fetched your super supporters.",
                        supporters: supporters
                    })
                }
            })
        }
    },

    get_supported: function(req, res){
        if(!req.params.id) {
            res.status(404).send({
                success: false,
                msg: "User ID is required!!",
            })
        } else {
            Support.find({
                supporter_id: req.params.id,
            }, async function (err, supported) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in fetching super supported artists!!",
                        err: err
                    })
                } else if (!supported) {
                    res.status(404).send({
                        success: false,
                        msg: "You haven't super supported anyone till date!!",
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Successfully fetched super supported artists.",
                        supported: supported
                    })
                }
            })
        }
    }
}

module.exports = functions