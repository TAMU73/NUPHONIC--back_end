//@package importing
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//@desc using express in the app
const app = express()

//@desc importing other class
const connectDB = require('./config/db')
const routes = require('./routes/index')

//@desc connection for MongoDB
connectDB()

//@desc showing json data in @web
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//@desc routing purpose
app.use(routes)

//@desc checking mode
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//@desc checking port
const PORT = process.env.PORT || 3000

//@desc listening the port for starting server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))

