const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema

let ActivitySchema = new mongoose.Schema({
        
       name:{type:String},
       created:{
           type:Date,
           default:Date.now
       }
})

const ActivitiesModel= mongoose.model('activities',ActivitySchema);

module.exports=ActivitiesModel