const Song = require('../models/song')

const functions = {
    
    upload_song: function (req, res) {
        if(!req.body.song_name || !req.body.song_url || !req.body.song_cover_url || !req.body.genre_name || !req.body.artist_id || !req.body.song_description) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else {
            var newSong = Song({
                song_name: req.body.song_name,
                song_url: req.body.song_url,
                song_cover_url: req.body.song_cover_url,
                genre_name: req.body.genre_name,
                artist_id: req.body.artist_id,
                album_id: req.body.album_id,
                song_description: req.body.song_description,
                song_lyrics: req.body.song_lyrics
            })
            newSong.save(async function (err, newSong) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in uploading song!!",
                        err: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Successfully Uploaded."
                    })
                }
            })
        }
    },

    get_song_detail: async function(req, res) {
        try {
            const song = await Song.findById(req.params.id)
            res.status(200).send({
                success: true,
                song: song
            })
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to retrive Song details!!",
                err: err
            })
        }
    },
}

module.exports = functions