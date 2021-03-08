const Album = require('../models/album')

const functions = {
    create_album: function(req, res) {
        if(!req.body.album_name || !req.body.artist_id || !req.body.artist_name || !req.body.album_picture || !req.body.album_description) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            Album.findOne({
                album_name: req.body.album_name,
                artist_id: req.body.artist_id,
            }, function(err, album){
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in uploading song!!"
                    })
                } else if(album) {
                    res.status(404).send({
                        success: false,
                        msg: "Album already exists!!"
                    })
                } else {
                    var newAlbum = Album({
                        album_name: req.body.album_name,
                        artist_id: req.body.artist_id,
                        artist_name: req.body.artist_name,
                        album_picture: req.body.album_picture,
                        album_description: req.body.album_description,
                    })
                    newAlbum.save(async function (err, newAlbum) {
                        if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in creating album!!",
                                err: err
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully Created.",
                                album: newAlbum
                            })
                        }
                    })
                }
            })
        }
    },
    add_songs: async function(req, res) {
        if(!req.body.song_id || !req.body.album_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            Album.findOne({
                _id: req.body.album_id,
                album_songs: {"$in" : req.body.song_id}
            }, async function(err, song){
                if(!song) {
                    await Album.findOneAndUpdate(
                        {_id: req.body.album_id},
                        {$push: {album_songs: req.body.song_id}},
                    )
                    res.status(200).send({
                        success: true,
                        msg: "Successfully Added.",
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in adding songs to the album!!",
                        err: err
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Song already exists!!",
                    })
                }
            })
            
        }
    },
    get_album_detail: async function(req, res) {
        try {
            await Album.findById(req.params.id, function(err, album){
                if(album) {
                    res.status(200).send({
                        success: true,
                        album: album
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to retrive album details!!",
                        err: err
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Album does not exists!!",
                    })
                }
            })
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to retrive album details!!",
                err: err
            })
        }
    },
    get_user_albums: async function(req, res) {
        await Album.find({
            artist_id: req.params.id
        }, async function(err, albums) {
            if(albums) {
                res.status(200).send({
                    success: true,
                    albums: albums
                })
            } else if(!albums) {
                res.status(404).send({
                    success: false,
                    msg: "You don't have any albums!!",
                })
            } else {
                res.status(404).send({
                    success: false,
                    msg: "Failed to retrive your album details!!",
                    err: err
                })
            }
        })
    },
    delete_album: async function(req, res) {
        await Album.findById({
            _id: req.params.id
        }, async function(err, album) {
            if(album) {
                var albumIsEmpty = album.album_songs.length
                if(albumIsEmpty != 0) {
                    res.status(404).send({
                        success: false,
                        msg: "Empty the album in order to delete!!",
                    })
                } else {
                    await Album.deleteOne({_id: req.params.id})
                    res.status(200).send({
                        success: true,
                        msg: "Album Deleted Successfully."
                    })
                }
            } else if(!album) {
                res.status(404).send({
                    success: false,
                    msg: "Album does not exists!!",
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
    delete_album_song: async function(req, res) {
        if(!req.body.song_id || !req.body.album_id) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!",
            })
        } else {
            Album.findById({_id: req.body.album_id}, async function(err, album) {
                if(album) {
                    Album.findOne({
                        _id: req.body.album_id,
                        album_songs: {"$in" : req.body.song_id}
                    }, async function(err, album){
                        if(album) {
                            await Album.findByIdAndUpdate(req.body.album_id, {$pull: {album_songs: req.body.song_id}}, async function(err, album){
                                if(album) {
                                    await Song.findOneAndUpdate({_id: req.body.song_id},{ $set: {album_id: null, album_name: 'Single'}})
                                    res.status(200).send({
                                        success: true,
                                        msg: "Successfully Deleted.",
                                    })
                                } else {
                                    res.status(404).send({
                                        success: false,
                                        msg: "Error in deleting songs from the album!!",
                                        err: err
                                    })
                                }
                            })
                        } else if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in deleting songs from the album!!",
                                err: err
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "Song does not exists!!",
                            })
                        }
                    })
                } else if(!album) {
                    res.status(404).send({
                        success: false,
                        msg: "Album does not exists!!",
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Error in deleting songs from the album!!",
                        err: err
                    })
                }
            }) 
        }
    }
}

module.exports = functions