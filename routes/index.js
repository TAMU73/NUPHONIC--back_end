//@package importing
const express = require('express')

const router = express.Router()
const authentication = require('../methods/authentication')
const song = require('../methods/song')
const feature = require('../methods/feature')

//@desc uploading song
//@route /upload_song
router.post('/upload_song', song.upload_song)

//@desc getting information of the user
//@route /get_info
router.get('/browse_songs', song.browse_songs)

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
router.get('/sign_in', authentication.sign_in)

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