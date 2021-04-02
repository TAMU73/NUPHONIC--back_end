const FavouriteSong = require('../models/favourite_song')

const functions = {
    add_songs: async function(req, res) {
        if(!req.body.song_id || !req.body.user_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            FavouriteSong.findOne({
                user_id: req.body.user_id
            }, async function(err, user) {
                if(user) {
                    FavouriteSong.findOne({
                        user_id: req.body.user_id,
                        song_list: {"$in" : req.body.song_id}
                    }, async function(err, song){
                        if(!song) {
                            FavouriteSong.findOneAndUpdate(
                                {user_id: req.body.user_id},
                                {$push: {song_list: req.body.song_id}}, async function(err, success) {
                                    if(success) {
                                        res.status(200).send({
                                            success: true,
                                            msg: "Successfully marked this song as favourite.",
                                            favourites: success
                                        })
                                    } else {
                                        res.status(404).send({
                                            success: false,
                                            msg: "Error in marking this song as favourite!!",
                                            err: err
                                        })
                                    }
                                }
                            )
                        } else if(song) {
                            res.status(404).send({
                                success: false,
                                msg: "This song is already marked as favourite!!",
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "Error in marking this song as favourite!!",
                                err: err
                            })
                        }
                    })
                } else if (!user) {
                    var newFavouriteSong = FavouriteSong({
                        user_id: req.body.user_id,
                        song_list: [req.body.song_id]
                    })
                    newFavouriteSong.save(async function (err, newFavourite) {
                        if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in marking this song as favourite!!",
                                err: err
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully marked this song as favourite.",
                                favourites: newFavourite
                            })
                        }
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Error in marking this song as favourite!!",
                        err: err
                    })
                }
            })        
        }
    },
    remove_songs: async function(req, res) {
        if(!req.body.song_id || !req.body.user_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            FavouriteSong.findOne({
                user_id: req.body.user_id,
                song_list: {"$in" : req.body.song_id}
            }, async function(err, song){
                if(song) {
                    FavouriteSong.findOneAndUpdate(
                        {user_id: req.body.user_id},
                        {$pull: {song_list: req.body.song_id}}, async function(err, success){
                        if(success) {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully unmarked this song from favourites.",
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "Error in unmarking the song from favourites!!",
                                err: err
                            })
                        }
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in unmarking the song from favourites!!",
                        err: err
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Song does not exists in your favourites!!",
                    })
                }
            })
        }
    },
    get_favourite_songs: async function(req, res) {
        if(!req.params.id) {
            res.status(404).send({
                success: false,
                msg: "User ID is required!!",
            })
        } else {
            FavouriteSong.findOne({
                user_id: req.params.id
            }, async function(err, songs) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in fetching favourite songs!!",
                        err: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Successfully fetched favourite songs list.",
                        song_list: songs
                    })
                }
            })        
        }
    }
}

module.exports = functions