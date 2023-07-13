const mongoose = require('mongoose')

const CoinSchema = new mongoose.Schema({
    Symbol: {
        type : String,
        unique : true
    },
    name : {
        type : String,
        unique : true
    },
    marketCapUsd : {
        type : String
    },
    priceUsd: {
        type : String
    }
}, {timestamps: true})

module.exports = mongoose.model('coins', CoinSchema)