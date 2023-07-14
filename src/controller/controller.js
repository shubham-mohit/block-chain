const coinModel = require('../model/coinmodel')
const axios = require('axios')
const Api_key = "4d6fa3aa-0433-4bfb-88d3-ba8d1cf45d"

const createCoinData = async function(req,res){
    try {
     const getcoin = await axios.get('https://api.coincap.io/v2/assets', {
        headers: {
          Authorization: `Bearer ${Api_key}`,
        },
    })
    const coin = getcoin.data.data.slice(0,100)
    const save = await coinModel.insertMany(coin)
    res.status(201).send({status:true,Message:"save to database" , data : coin })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getCoinData = async function(req,res) {
    try {
        const getCoins = await coinModel.find().sort({changePercent24Hr:1}).select({name:1, rank:1, changePercent24Hr:1})
        res.status(200).send({status:true, data : getCoins})
    } catch (error) {
        res.status(500).send({status:false, Error: error.message})
    }
}


module.exports = {createCoinData,getCoinData}