const User = require('../models/user')
const Song = require('../models/song')

const functions = {
    search_songs: async function(req, res) {
        if(!req.params.name) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else {
            Song.find({
                song_name: { "$regex": req.params.name, "$options": "i" }
            }, async function(err, songs) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Unable to fetch songs, please try again.",
                        err: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Successfully fetched songs.",
                        songs: songs
                    })
                }
            })
        }
    },
    search_artists: async function(req, res) {
        if(!req.params.name) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else {
            User.find({
                username: { "$regex": req.params.name, "$options": "i" }
            }, async function(err, artists) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Unable to fetch artists, please try again.",
                        err: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        msg: "Successfully fetched artists.",
                        artists: artists
                    })
                }
            })
        }
    },
}

module.exports = functions