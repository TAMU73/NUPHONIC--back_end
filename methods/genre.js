const Genre = require('../models/genre')
const SuggestedGenre = require('../models/suggested_genre')
const Song = require('../models/song')

const functions = {
    upload_genre: function(req, res) {
        if(!req.body.genre_name || !req.body.genre_picture_url || !req.body.genre_color) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else {
            Genre.findOne({genre_name: req.body.genre_name}, function(err, genre) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Error in uloading song!!",
                        err: err
                    })
                } else if(genre) {
                    res.status(404).send({
                        success: false,
                        msg: "Genre already exists!!"
                    })
                } else {
                    var newGenre = Genre({
                        genre_name: req.body.genre_name,
                        genre_picture_url: req.body.genre_picture_url,
                        genre_color: req.body.genre_color
                    })
                    newGenre.save(function(err, genre){
                        if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in uploading genre!!",
                                err: err
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully Uploaded.",
                                genre: genre
                            })
                        
                        }
                    })
                }
            })
        }
    },
     
    browse_genres: function(req, res) {
        try{
            Genre.findRandom({}, {}, {limit: Infinity}, function(err, genres){
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to retrive genres!!",
                        err: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        genre: genres
                    })
                }
            })
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to retrive genres!!",
                err: err
            })
        }
    },

    suggest_genre: async function(req, res) {
        if(!req.body.genre_name || !req.body.user_id || !req.body.genre_description) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else {
            var genreName = req.body.genre_name.toLowerCase().charAt(0).toUpperCase() + req.body.genre_name.toLowerCase().slice(1)
            Genre.findOne({genre_name: genreName}, async function(err, genre) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to suggest genres!!",
                        err: err
                    })
                } else if(genre) {
                    res.status(404).send({
                        success: false,
                        msg: "Genre already exists!!",
                    })
                } else {
                    var newGenre = SuggestedGenre({
                        genre_name: req.body.genre_name,
                        genre_description: req.body.genre_description,
                        suggested_by: req.body.user_id
                    })
                    newGenre.save(function(err, genre){
                        if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Error in suggesting genre!!",
                                err: err
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                msg: "Successfully Suggested.",
                                genre: genre
                            })
                        
                        }
                    })
                }
            })
        }
    },

    get_genre_songs: function(req, res) {
        if(!req.body.genre_name) {
            res.status(404).send({
                success: false,
                msg: "Genre name needed!!",
            })
        } else {
            Song.findRandom({genre_name: req.body.genre_name}, {}, {limit: Infinity}, function(err, songs){
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to retrive songs!!",
                        err: err
                    })
                } else if(!songs) {
                    res.status(404).send({
                        success: false,
                        msg: "No Songs Found!!",
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        songs: songs
                    })
                }
            })
        }
    }
}

module.exports = functions