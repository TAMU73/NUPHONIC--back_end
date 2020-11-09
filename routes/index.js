//@package importing
const express = require('express')

const router = express.Router()
const actions = require('../methods/actions')

//@desc signing up user
//@route /sign_up
router.post('/sign_up', actions.sign_up)

//@desc signing in user
//@route /sign_in
router.post('/sign_in', actions.sign_in)

//@desc getting information of the user
//@route /get_info
router.get('/get_info/:id', actions.get_info)

//@desc changing password of the user
//@route /change_password
router.patch('/change_password/:id', actions.change_password)

//@desc delete user
//@route /delete_user
router.delete('/delete_user/:id', actions.delete_user)

//@desc forgot password
//@route /forgot_password
router.patch('/forgot_password', actions.forgot_password)

//@desc confirm code
//@route /confirm_code
router.patch('/confirm_code', actions.confirm_code)

//@desc reset password
//@route /reset_password
router.patch('/reset_password', actions.reset_password)

module.exports = router