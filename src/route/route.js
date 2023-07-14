const express = require('express')
const { createCoinData, getCoinData } = require('../controller/controller')
const { create_captcha, create_api_key } = require('../middleware/moddleware')
const { login, createUser } = require('../controller/usercontroller')
const router = express.Router()

router.post('/createcoin', createCoinData )
router.get('/coinsort', getCoinData)
// router.post('/createUser', create_captcha , createUser)
// router.post('/loginUser', create_api_key ,login )

module.exports = router