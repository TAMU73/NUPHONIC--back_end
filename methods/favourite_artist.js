const FavouriteArtist = require('../models/favourite_artist')

const functions = {
    add_artists: async function(req, res) {
        if(!req.body.artist_id || !req.body.user_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            FavouriteArtist.findOne({
                user_id: req.body.user_id
            }, async function(err, user) {
                if(user) {
                    FavouriteArtist.findOne({
                        user_id: req.body.user_id,
                        artist_list: {"$in" : req.body.artist_id}
                    }, async function(err, artist){
                        if(!artist) {
                            FavouriteArtist.findOneAndUpdate(
                                {user_id: req.body.user_id},
                                {$push: {artist_list: req.body.artist_id}}, async function(err, success) {
                                    if(success) {
                                        res.status(200).send({
                                            success: true,
                                            msg: "Successfully marked this artist as favourite.",
                                            favourites: success
                                        })
                                    } else {
                                        res.status(404).send({
                                            success: false,
                                            msg: "Error in marking this artist as favourite!!",
                                            err: err
                                        })
                                    }
                                }
                            )
                        } else if(artist) {
                            res.status(404).send({
                                success: false,
                                msg: "This artist is already marked as favourite!!",
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "Error in marking this artist as favourite!!",
                                err: err
                            })
                        }
                    })
                } else if (!user) {
                    var newFavouriteArtist = FavouriteArtist({
                        user_id: req.body.user_id,
                        artist_list: [req.body.artist_id]
                    })
                    newFavouriteArtist.save(async function (err, newFavourite) {
                        if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in marking this artist as favourite!!",
                                err: err
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully marked this artist as favourite.",
                                favourites: newFavourite
                            })
                        }
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Error in marking this artist as favourite!!",
                        err: err
                    })
                }
            })        
        }
    },
    remove_artists: async function(req, res) {
        if(!req.body.artist_id || !req.body.user_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            FavouriteArtist.findOne({
                user_id: req.body.user_id,
                artist_list: {"$in" : req.body.artist_id}
            }, async function(err, artist){
                if(artist) {
                    FavouriteArtist.findOneAndUpdate(
                        {user_id: req.body.user_id},
                        {$pull: {artist_list: req.body.artist_id}}, async function(err, success){
                        if(success) {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully unmarked this artist from favourites.",
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "Error in unmarking the artist from favourites!!",
                                err: err
                            })
                        }
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in unmarking the artist from favourites!!",
                        err: err
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Artist does not exists in your favourites!!",
                    })
                }
            })
        }
    },
    get_favourite_artists: async function(req, res) {
        if(!req.params.id) {
            res.status(404).send({
                success: false,
                msg: "User ID is required!!",
            })
        } else {
            FavouriteArtist.findOne({
                user_id: req.params.id
            }, async function(err, artists) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in fetching favourite artists!!",
                        err: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Successfully fetched favourite artists list.",
                        artist_list: artists
                    })
                }
            })        
        }
    }
}

module.exports = functions