const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://sourabhamohite2812:wXzbwlWssiEAjJL1@cluster0.m7awpol.mongodb.net/shubham-22', {useNewUrlParser: true})
.then(()=> console.log('MondoDb is connected') )
.catch((err)=> {console.log(err.message)})

app.use('/', route)

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Express app running on PORT ', process.env.PORT || 3000)
})
