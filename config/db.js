//@package importing
const mongoose = require('mongoose')
const dbconfig = require('./dbconfig')

const connectDB = async () => {
    try {
        //@desc connecting to db
        const conn = await mongoose.connect(dbconfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to MongoDB: ${conn.connection.host}`)
    } catch(err) {
        console.log(err)
        //@desc exits with error
        process.exit(1)
    }
}

//@export connectDB
module.exports = connectDB