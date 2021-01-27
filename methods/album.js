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
                                msg: "Error in uploading album!!",
                                err: err
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully Uploaded.",
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
                        msg: "Successfully Updated.",
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
    }
}

module.exports = functions