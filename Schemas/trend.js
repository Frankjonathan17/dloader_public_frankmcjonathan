const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema

let Schema = new mongoose.Schema({
 
    deviceId:{type:String,default:""},
    timeline:[],
    created:{
        type:Date,
        default:Date.now
    }
})

const trendModel = mongoose.model('tredn',Schema);

module.exports =  trendModel