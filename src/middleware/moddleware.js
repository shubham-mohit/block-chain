const userModel = require('../model/usermodel')
const coinModel = require('../model/coinmodel')
const svgCaptcha = require('svg-captcha');
const crypto = require('crypto')




const create_captcha = async function(req,res,next){
    try {
        function captcha(a){
            let characters =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let result = ""
            for(let i=0;i<a;i++){
                result = result + characters.charAt(Math.floor(Math.random() * characters.length));
                result = result + characters.charAt(Math.floor(Math.random() * characters.length));
                result = result + characters.charAt(Math.floor(Math.random() * characters.length));
                result = result + characters.charAt(Math.floor(Math.random() * characters.length));
                return result
            }
        }
            let ans = captcha(4)
            req.captchad = ans
            console.log(req.captchad)
            next()

    } catch (error) {
        res.status(500).send({status:false, Error: error.message})
    }
}

const create_api_key = async function(req,res,next){
    let apiKey = crypto.randomBytes(20).toString('hex');
    req.apiKey = apiKey
    console.log('hi2')
    next()
}

module.exports = {create_captcha,create_api_key}