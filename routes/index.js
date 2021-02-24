//@package importing
const express = require('express')

const router = express.Router()
const authentication = require('../methods/authentication')
const song = require('../methods/song')
const feature = require('../methods/feature')
const genre = require('../methods/genre')
const album = require('../methods/album')
const playlist = require('../methods/playlist')

//@desc delete user's playlist song
//@route /delete_playlist_song
router.patch('/delete_playlist_song', playlist.delete_playlist_song)

//@desc delete user's playlists
//@route /delete_playlist
router.delete('/delete_playlist/:id', playlist.delete_playlist)

//@desc get user's playlists
//@route /user_playlists
router.get('/user_playlists/:id', playlist.get_user_playlists)

//@desc get playlist detail
//@route /playlist_detail
router.get('/playlist_detail/:id', playlist.get_playlist_detail)

//@desc adding playlist songs
//@route /add_playlist_songs
router.post('/add_playlist_songs', playlist.add_songs)

//@desc creating playlist
//@route /create_playlist
router.post('/create_playlist', playlist.create_playlist)

//@desc get album detail
//@route /album_detail
router.get('/album_detail/:id', album.get_album_detail)

//@desc uploading album
//@route /upload_album
router.post('/create_album', album.create_album)

//@desc adding album songs
//@route /add_album_songs
router.patch('/add_album_songs', album.add_songs)

//@desc genre songs
//@route /genre songs
router.post('/genre_songs', genre.get_genre_songs)

//@desc suggest genre
//@route /suggest_genre
router.post('/suggest_genre', genre.suggest_genre)

//@desc uploading genre
//@route /upload_genre
router.post('/upload_genre', genre.upload_genre)

//@desc browse genres
//@route /broese_genres
router.get('/browse_genres', genre.browse_genres)

//@desc uploading song
//@route /upload_song
router.post('/upload_song', song.upload_song)

//@desc adding listens
//@route /add_listen
router.patch('/add_listen/:id', song.add_listen)

//@desc getting information of the user
//@route /get_info
router.get('/browse_songs', song.browse_songs)

//@desc get artist songs
//@route /artist_songs
router.get('/artist_songs/:id', song.get_artist_songs)

//@desc get song detail
//@route /song_detail
router.get('/song_detail/:id', song.get_song_detail)

//@desc post feature song
//@route /feature_song
router.post('/feature_song/:id', feature.feature_song)

//@desc get featured songs
//@route /featured_songs
router.get('/featured_songs', feature.get_featured_song)

//@desc post feature artist
//@route /feature_artist
router.post('/feature_artist/:id', feature.feature_artist)

//@desc get featured artists
//@route /featured_artists
router.get('/featured_artists', feature.get_featured_artists)

//@desc signing up user
//@route /sign_up
router.post('/sign_up', authentication.sign_up)

//@desc signing in user
//@route /sign_in
router.post('/sign_in', authentication.sign_in)

//@desc getting information of the user
//@route /get_info
router.get('/get_info/:id', authentication.get_info)

//@desc changing password of the user
//@route /change_password
router.patch('/change_password/:id', authentication.change_password)

//@desc delete user
//@route /delete_user
router.delete('/delete_user/:id', authentication.delete_user)

//@desc forgot password
//@route /forgot_password
router.patch('/forgot_password', authentication.forgot_password)

//@desc confirm code
//@route /confirm_code
router.patch('/confirm_code', authentication.confirm_code)

//@desc reset password
//@route /reset_password
router.patch('/reset_password', authentication.reset_password)

module.exports = router