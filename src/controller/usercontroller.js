const { create_captcha } = require('../middleware/moddleware')
const userModel = require('../model/usermodel')
const validator = require('validator')

const createUser = async function(req,res){
    try {
        let data = req.body
        let {Email ,  password} = data
        let captcha = req.captchad
        data.captcha = captcha

        if(!Email) { return res.status(400).send({status:false, Message: "EmailId is required"})}
        if(!validator.isEmail(Email)) {return res.status(400).send({status: false, Message: 'Enter valid EmailId'})}
        const checkDuplicate = await userModel.findOne({Email : Email})
        if(checkDuplicate) {
            return res.status(400).send({status:false, Message: "EmailId is already in use"})
        }

        if(!password) {return res.status(400).send({status:false, Message: "Password is required"})}
        if(!validator.isStrongPassword(password)) {return res.status(400).send({status:false, Message: "Enter a strong password"})}
        
        const createuserd = await userModel.create(data)
        const createuser = await userModel.findOne({Email: Email}).select({Email:1, captcha:1, password:1,_id:0})

        res.status(201).send({status: true, Data: createuser})
    } catch (error) {
        res.status(500).send({status:false, Error: error.message})
    }
}


let  login = async function(req,res){
    try {
        let data = req.body
        let API_KEY = req.apiKey
        data.API_KEY = API_KEY
        let {Email, password} = data
        if(!Email) {return res.status(400).send({status:false, Message: "Email is required"})}
        if(!password) {return res.status(400).send({status:false, Message: "Password is required"})}
        
        if(!validator.isEmail(Email)) {return res.status(400).send({status: false, Message: 'Enter valid EmailId'})}
        const checkEmail = await userModel.findOne({Email : Email, password: password})
        if(!checkEmail) {
            return res.status(404).send({status:false, Message: "EmailId not found"})
        }
        res.status(201).send({status:true, Message: `${data.API_KEY} This is your secrete API key` })

    } catch (error) {
        res.status(500).send({status:false, Error: error.message})
    }
}

module.exports = {login,createUser}