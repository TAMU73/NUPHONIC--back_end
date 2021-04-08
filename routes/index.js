const express = require('express')
const router = express.Router()
const authentication = require('../methods/authentication')
const song = require('../methods/song')
const feature = require('../methods/feature')
const genre = require('../methods/genre')
const album = require('../methods/album')
const playlist = require('../methods/playlist')
const support = require('../methods/support')
const favouriteSong = require('../methods/favourite_song')
const favouriteArtist = require('../methods/favourite_artist')
const search = require('../methods/search')
const suggest = require('../methods/suggest')

//
//User Profile
//

//@desc getting information of the user
//@route /get_info
router.get('/get_info/:id', authentication.get_info) //done

//@desc get user's super supportered list
//@route /super_supportered
router.get('/super_supported/:id', support.get_supported) //done

//
//Settings
//

//@desc suggest feature
//@route /suggest_feature
router.post('/suggest_feature', suggest.suggest_feature) //done

//@desc editing user profile picture
//@route /edit_profile_picture
router.patch('/edit_profile_picture', authentication.edit_profile_picture) //done

//@desc editing user fullname
//@route /edit_fullname
router.patch('/edit_fullname', authentication.edit_fullname) //done

//@desc editing user username
//@route /edit_username
router.patch('/edit_username', authentication.edit_username) //done

//@desc changing password of the user
//@route /change_password
router.patch('/change_password/:id', authentication.change_password) //done

//
//Search Songs and Artists
//

//@desc get user's favourite artists list
//@route /get_favourite_artists
router.get('/search_artists/:name', search.search_artists)

//@desc get user's favourite artists list
//@route /get_favourite_artists
router.get('/search_songs/:name', search.search_songs)

//
//Mark As Favourite
//

//@desc get user's favourite artists list
//@route /get_favourite_artists
router.get('/get_favourite_artists/:id', favouriteArtist.get_favourite_artists) //done

//@desc removing favourite artists
//@route /remove_favourite_artists
router.patch('/remove_favourite_artists', favouriteArtist.remove_artists) //done

//@desc adding favourite artists
//@route /add_favourite_artists
router.patch('/add_favourite_artists', favouriteArtist.add_artists) //done

//@desc get user's favourite songs list
//@route /super_supportered
router.get('/get_favourite_songs/:id', favouriteSong.get_favourite_songs) //done

//@desc removing favourite songs
//@route /remove_favourite_songs
router.patch('/remove_favourite_songs', favouriteSong.remove_songs) //done

//@desc adding favourite songs
//@route /add_favourite_songs
router.patch('/add_favourite_songs', favouriteSong.add_songs) //done

//
//Upload song
//

//@desc deleting song
//@route /delete_song
router.delete('/delete_song', song.delete_song) //done

//@desc uploading song
//@route /upload_song
router.post('/upload_song', song.upload_song) //done

//@desc get artist songs
//@route /artist_songs
router.get('/artist_songs/:id', song.get_artist_songs) //done

//
//Donation
//

//@desc get user's super supporters
//@route /super_supporters
router.get('/super_supporters/:id', support.get_supporters) //done

//@desc super support
//@route /super_support
router.post('/super_support', support.support_artist) //done




//
//Album
//

//@desc get album detail
//@route /album_detail
router.get('/album_detail/:id', album.get_album_detail) //done

//@desc delete user's album song
//@route /delete_album_song
router.patch('/delete_album_song', album.delete_album_song) //done

//@desc delete user's albums
//@route /delete_album
router.delete('/delete_album/:id', album.delete_album) //done

//@desc get user's albums
//@route /user_albums
router.get('/user_albums/:id', album.get_user_albums) //done

//@desc uploading album
//@route /upload_album
router.post('/create_album', album.create_album) //done

//@desc adding album songs
//@route /add_album_songs
router.patch('/add_album_songs', album.add_songs) //done

//
//Playlist
//

//@desc delete user's playlist song
//@route /delete_playlist_song
router.patch('/delete_playlist_song', playlist.delete_playlist_song) //done

//@desc delete user's playlists
//@route /delete_playlist
router.delete('/delete_playlist/:id', playlist.delete_playlist) //done

//@desc get user's playlists
//@route /user_playlists
router.get('/user_playlists/:id', playlist.get_user_playlists) //done

//@desc get playlist detail
//@route /playlist_detail
router.get('/playlist_detail/:id', playlist.get_playlist_detail) //done

//@desc adding playlist songs
//@route /add_playlist_songs
router.post('/add_playlist_songs', playlist.add_songs) //done

//@desc creating playlist
//@route /create_playlist
router.post('/create_playlist', playlist.create_playlist) //done

//
//Music Player
//

//@desc get song detail
//@route /song_detail
router.get('/song_detail/:id', song.get_song_detail) //done

//@desc adding listens
//@route /add_listen
router.patch('/add_listen/:id', song.add_listen) //done



//
//Genre
//
//@desc genre songs
//@route /genre songs
router.post('/genre_songs', genre.get_genre_songs)

//@desc suggest genre
//@route /suggest_genre
router.post('/suggest_genre', genre.suggest_genre) //done

//@desc uploading genre
//@route /upload_genre
router.post('/upload_genre', genre.upload_genre)

//@desc browse genres
//@route /broese_genres
router.get('/browse_genres', genre.browse_genres)

//
//Browse Songs
//

//@desc getting information of the user
//@route /get_info
router.get('/browse_songs', song.browse_songs) //done

//
//Featured Songs and Artists
//

//@desc post feature song
//@route /feature_song
router.post('/feature_song/:id', feature.feature_song) //done

//@desc get featured songs
//@route /featured_songs
router.get('/featured_songs', feature.get_featured_song) //done

//@desc post feature artist
//@route /feature_artist
router.post('/feature_artist/:id', feature.feature_artist) //done

//@desc get featured artists
//@route /featured_artists
router.get('/featured_artists', feature.get_featured_artists) //done

//
//Authentication
//

//@desc signing up user
//@route /sign_up
router.post('/sign_up', authentication.sign_up) //done

//@desc signing in user
//@route /sign_in
router.post('/sign_in', authentication.sign_in) //done

//@desc forgot password
//@route /forgot_password
router.patch('/forgot_password', authentication.forgot_password) //done

//@desc confirm code
//@route /confirm_code
router.patch('/confirm_code', authentication.confirm_code) //done

//@desc reset password
//@route /reset_password
router.patch('/reset_password', authentication.reset_password) //done

//@desc delete user
//@route /delete_user
//router.delete('/delete_user/:id', authentication.delete_user)


module.exports = router