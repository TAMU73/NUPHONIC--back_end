const Song = require('../models/song')
const User = require('../models/user')
const FeaturedSong = require('../models/featured_song')
const FeaturedArtist = require('../models/featured_artist')

const functions = {
    
    feature_song: async function(req, res) {
        try {
            Song.findById(req.params.id, function(err, song) {
                if(song) {
                    FeaturedSong.findOne({
                        song_id: req.params.id
                    }, function(err, featuredSong){
                        if(!featuredSong) {
                            var newFeaturedSong = FeaturedSong({
                                song_id: req.params.id
                            })
                            newFeaturedSong.save(async function (err, newSong) {
                                if(err) {
                                    res.status(404).send({
                                        success: false,
                                        msg: "Error in featuring song!!",
                                        err: err
                                    })
                                } else {
                                    res.status(200).send({
                                        success: true,
                                        msg: "Successfully Featured.",
                                        song: song
                                    })
                                }
                            })
                        } else if (featuredSong) {
                            res.status(404).send({
                                success: false,
                                msg: "Song has already been featured!!",
                            })
                        } else if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in featuring song!!",
                                err: err
                            })
                        }
                    })
                } else if(!song) {
                    res.status(404).send({
                        success: false,
                        msg: "Song does not exist!!",
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in featuring song!!",
                        err: err
                    })
                }
            })
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to feature song!!",
                err: err
            })
        }
    },

    get_featured_song: function(req, res) {
        FeaturedSong.find({}, function(err, songs){
            if(err) {
                res.status(404).send({
                    success: false,
                    msg: "Failed to retrive featured songs!!",
                    err: err
                })
            } else if(songs=='') {
                res.status(404).send({
                    success: false,
                    msg: "No featured songs!!",
                })
            } else {
                res.status(200).send({
                    success: true,
                    songs: songs,
                })
            }
        })
    },

    feature_artist: async function(req, res) {
        try {
            User.findById(req.params.id, function(err, user) {
                if(user) {
                    FeaturedArtist.findOne({
                        artist_id: req.params.id
                    }, function(err, featuredArtist){
                        if(!featuredArtist) {
                            var newFeaturedArtist = FeaturedArtist({
                                artist_id: req.params.id
                            })
                            newFeaturedArtist.save(async function (err, newArtist) {
                                if(err) {
                                    res.status(404).send({
                                        success: false,
                                        msg: "Error in featuring artist!!",
                                        err: err
                                    })
                                } else {
                                    res.status(200).send({
                                        success: true,
                                        msg: "Successfully Featured.",
                                        artist: user
                                    })
                                }
                            })
                        } else if (featuredArtist) {
                            res.status(404).send({
                                success: false,
                                msg: "Artist has already been featured!!",
                            })
                        } else if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in featuring artist!!",
                                err: err
                            })
                        }
                    })
                } else if(!user) {
                    res.status(404).send({
                        success: false,
                        msg: "User does not exist!!",
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in featuring artist!!",
                        err: err
                    })
                }
            })
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to feature artist!!",
                err: err
            })
        }
    },

    get_featured_artists: function(req, res) {
        FeaturedArtist.find({}, function(err, artists){
            if(err) {
                res.status(404).send({
                    success: false,
                    msg: "Failed to retrive featured artists!!",
                    err: err
                })
            } else if(artists=='') {
                res.status(404).send({
                    success: false,
                    msg: "No featured artists!!",
                })
            } else {
                res.status(200).send({
                    success: true,
                    artists: artists,
                })
            }
        })
    },
    
}

module.exports = functions