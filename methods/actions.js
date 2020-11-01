const User = require('../models/user')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))

const functions = {
    sign_up: function (req, res) {
        var valid = emailRegex.test(req.body.email)
        if(!req.body.email || !req.body.password || !req.body.retypePassword || !req.body.full_name || !req.body.username) {
            res.status(404).send({
                success: false,
                msg: "All fields are required!!"
            })
        } else if (!valid) {
            res.status(404).send({
                success: false,
                msg: "Not a valid email!!"
            })
        } else if( req.body.password != req.body.retypePassword){
            res.status(404).send({
                success: false,
                msg: "Password should match!!"
            })
        } else {
            User.findOne({
                username: req.body.username
            }, function(err, user) {
                if(!user) {
                    User.findOne({
                        email: req.body.email
                    }, function(err, user){
                        if(!user) {
                            var newUser = User({
                                full_name: req.body.full_name,
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password,
                            })
                            newUser.save( function (err, newUser) {
                                if(err) {
                                    res.status(404).send({
                                        success: false,
                                        msg: "Failed to Sign Up!!",
                                        err: err
                                    })
                                } else {
                                    res.status(200).send({
                                        success: true,
                                        id: newUser.id,
                                        msg: "Signed Up Successfully"
                                    })
                                    transport.sendMail({
                                        to: req.body.email,
                                        from: "tamusanjiv6773@gmail.com",
                                        subject: "Welcome to Nuphonic",
                                        html: "<h1>Successfully Signed Up</h1>"
                                    })
                                }
                            })
                        } else if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Failed to Sign Up!!",
                                err: err
                            })
                        } else {
                            res.status(404).send({
                                success: false,
                                msg: "User already exists!!"
                            })
                        }
                    })
                } else if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to Sign Up!!",
                        err: err
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Username should be unique!!"
                    })
                }
            })
        }
    },
    sign_in: function(req, res) {
        var valid = emailRegex.test(req.body.email)
        if(!req.body.email || !req.body.password) {
            res.status(404).send({
                success: true,
                msg: "All fields are required!!"
            })
        } else if (!valid) {
            res.status(404).send({
                success: false,
                msg: "Not a valid email!!"
            })
        } else {
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to Sign In!!",
                        err: err
                    })
                } else if(!user) {
                    res.status(404).send({
                        success: false,
                        msg: "User not found!!"
                    })
                } else if (user && user.password == req.body.password) {
                    res.status(200).send({
                        success: true,
                        id: user.id,
                        msg: "Signed In Successfully"
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "Wrong Password!!"
                    })
                }
            })
        }
    },
    get_info: async function(req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).send({
                success: true,
                user: user
            })
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to retrive User!!",
                err: err
            })
        }
        
    },
    change_password: async function(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if(!req.body.newPassword || !req.body.currentPassword) {
                res.status(404).send({
                    success: false,
                    msg: "All fields are required!!"
                })
            } else { 
                if(user.password == req.body.currentPassword && req.body.newPassword != user.password) {
                    await User.updateOne({_id: req.params.id}, 
                        { $set: {password: req.body.newPassword}})
                    res.status(200).send({
                        success: true,
                        msg: "Password Successfully Changed"
                    })
                } else if (req.body.currentPassword != user.password){
                    res.status(404).send({
                        success: false,
                        msg: "Previous password didn't match!!"
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: "New password shouldn't match with current password!!"
                    })
                }
            }
        } catch(err) {
            res.status(404).send({
                success: false,
                msg: "Failed to Change!!",
                err: err
            })
        }
    },
    delete_user: async function(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if(user) {
                await User.deleteOne({_id: req.params.id})
                res.status(200).send({
                    success: true,
                    msg: `Deleted account successfully`
                })
            } else {
                res.status(404).send({
                    success: false,
                    msg: "User not found!!"
                })
            }
        } catch {
            res.status(404).send({
                success: false,
                msg: "Failed to Delete!!",
                err: err
            })
        }
    },
    forgot_password: async function(req, res) {
        if(!req.body.email) {
            res.status(200).send({
                success: true,
                msg: `Email required!!`
            })
        } else {
            await User.findOne({email: req.body.email}, async (err, user) => {
                if(err) {
                    res.status(404).send({
                        success: false,
                        msg: "Failed to reset!!",
                        err: err
                    })
                }
                else if(!user) {
                    res.status(404).send({
                        success: false,
                        msg: "User not found!!"
                    })
                } else {
                    var code = Math.floor(1000 + Math.random() * 9000)
                    await User.updateOne({email: req.body.email}, 
                        { $set: {reset_code: code}})
                    transport.sendMail({
                        to: req.body.email,
                        from: "tamusanjiv6773@gmail.com",
                        subject: "Forgot Password",
                        html: `<h1>Here is your code ${code}</h1>`
                    })
                    res.status(200).send({
                        success: true,
                        msg: "Code Sent"
                    })
                }
            })
        }         
    },
    confirm_code: async function(req, res) {
        if(!req.params.code || !req.body.email) {
            res.status(404).send({
                success: false,
                msg: "Code Needed!!"
            })
        } else {
            const user = await User.findOne({email: req.body.email})
            var sent_code = user.reset_code
            if(req.params.code==sent_code) {
                if(!req.body.password || !req.body.retypePassword || !req.body.email) {
                    res.status(404).send({
                        success: false,
                        msg: "All fields required!!"
                    })
                } else {
                    await User.findOne({email: req.body.email}, async (err,user) => {
                        if(err) {
                            res.status(404).send({
                                success: false,
                                msg: "Failed to reset!!",
                                err: err
                            })
                        }
                        else if(!user) {
                            res.status(404).send({
                                success: false,
                                msg: "User not found!!"
                            })
                        } else if (req.body.password != req.body.retypePassword) {
                            res.status(404).send({
                                success: false,
                                msg: "Both password should match!!"
                            })
                        } else {
                            await User.updateOne({email: req.body.email},{
                                $set: {
                                    password: req.body.password,
                                    reset_code: null
                                }
                            }).then(
                                res.status(200).send({
                                    success: true,
                                    msg: "Password Successfully Changed"
                                })
                            ) 
                        }
                    })
                }
            } else {
                res.status(404).send({
                    success: false,
                    msg: "Incorrect Code!!"
                })
            }
        }
    }   
        
}

module.exports = functions