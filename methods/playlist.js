const Playlist = require('../models/playlist')
const Song = require('../models/song')

const functions = {
    create_playlist: function(req, res) {
        if(!req.body.playlist_name || !req.body.user_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            Playlist.findOne({
                playlist_name: req.body.playlist_name,
                user_id: req.body.user_id,
            }, function(err, playlist){
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in uploading song!!"
                    })
                } else if(playlist) {
                    res.status(404).send({
                        success: false,
                        msg: "Playlist already exists!!"
                    })
                } else {
                    var newPlaylist = Playlist({
                        playlist_name: req.body.playlist_name,
                        user_id: req.body.user_id,
                    })
                    newPlaylist.save(async function (err, newPlaylist) {
                        if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in creating playlist!!",
                                err: err
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully Created.",
                                album: newPlaylist
                            })
                        }
                    })
                }
            })
        }
    },
    add_songs: async function(req, res) {
        if(!req.body.song_id || !req.body.playlist_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            Playlist.findById({_id: req.body.playlist_id}, async function(err, playlist) {
                if(playlist) {
                    Playlist.findOne({
                        _id: req.body.playlist_id,
                        playlist_songs: {"$in" : req.body.song_id}
                    }, async function(err, song){
                        if(!song) {
                            await Song.findById({_id: req.body.song_id}, async function(err, song) {
                                if(song) {
                                    await Playlist.findOneAndUpdate(
                                        {_id: req.body.playlist_id},
                                        {$push: {playlist_songs: req.body.song_id}},
                                    )
                                    res.status(200).send({
                                        success: true,
                                        msg: "Successfully Added.",
                                    })
                                } else if(!song) {
                                    res.status(404).send({
                                        success: false,
                                        msg: "Song does not exists!!",
                                    })
                                } else {
                                    res.status(404).send({
                                        success: false,
                                        msg: "Error in getting songs!!",
                                        err: err
                                    })
                                }
                            })   
                        } else if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in adding songs to the playlist!!",
                                err: err
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "Song already exists!!",
                            })
                        }
                    })
                } else if(!playlist) {
                    res.status(404).send({
                        success: false,
                        msg: "Playlist does not exists!!",
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Error in adding songs to the playlist!!",
                        err: err
                    })
                }
            })
            
            
        }
    },
    get_playlist_detail: async function(req, res) {
        try {
            await Playlist.findById(req.params.id, function(err, playlist){
                if(playlist) {
                    res.status(200).send({
                        success: true,
                        playlist: playlist
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to retrive playlist details!!",
                        err: err
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Playlist does not exists!!",
                    })
                }
            })
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to retrive playlist details!!",
                err: err
            })
        }
    },
    get_user_playlists: async function(req, res) {
        await Playlist.find({
            user_id: req.params.id
        }, async function(err, playlists) {
            if(playlists) {
                res.status(200).send({
                    success: true,
                    playlists: playlists
                })
            } else if(!playlists) {
                res.status(404).send({
                    success: false,
                    msg: "You don't have any playlist!!",
                })
            } else {
                res.status(404).send({
                    success: false,
                    msg: "Failed to retrive your playlist details!!",
                    err: err
                })
            }
        })
    },
    delete_playlist: async function(req, res) {
        await Playlist.findById({
            _id: req.params.id
        }, async function(err, playlist) {
            if(playlist) {
                await Playlist.deleteOne({_id: req.params.id})
                res.status(200).send({
                    success: true,
                    msg: "Playlist Deleted Successfully."
                })
            } else if(!playlist) {
                res.status(404).send({
                    success: false,
                    msg: "Playlist does not exists!!",
                })
            } else {
                res.status(404).send({
                    success: false,
                    msg: "Failed to delete your album!!",
                    err: err
                })
            }
        })
    },
    delete_playlist_song: async function(req, res) {
        if(!req.body.song_id || !req.body.playlist_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            Playlist.findById({_id: req.body.playlist_id}, async function(err, playlist) {
                if(playlist) {
                    Playlist.findOne({
                        _id: req.body.playlist_id,
                        playlist_songs: {"$in" : req.body.song_id}
                    }, async function(err, song){
                        if(song) {
                            await Playlist.findByIdAndUpdate(req.body.playlist_id, {$pull: {playlist_songs: req.body.song_id}}, async function(err, playlist){
                                if(playlist) {
                                    res.status(200).send({
                                        success: true,
                                        msg: "Successfully Deleted.",
                                    })
                                } else {
                                    res.status(404).send({
                                        success: false,
                                        msg: "Error in deleting songs from the playlist!!",
                                        err: err
                                    })
                                }
                            })
                        } else if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in deleting songs from the playlist!!",
                                err: err
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "Song does not exists!!",
                            })
                        }
                    })
                } else if(!playlist) {
                    res.status(404).send({
                        success: false,
                        msg: "Playlist does not exists!!",
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Error in deleting songs from the playlist!!",
                        err: err
                    })
                }
            }) 
        }
    }
}

module.exports = functions