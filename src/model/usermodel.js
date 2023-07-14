const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
    },
    captcha : {
        type : String
    }
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)