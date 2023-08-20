const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema

let  Schema = new mongoose.Schema({

       user:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
       type:{type:String, default:""},
       movie:{type:mongoose.Schema.Types.ObjectId, ref:"movies"},
       show:{type:mongoose.Schema.Types.ObjectId, ref:"shows"},
       episodes:[],
       created:{
           type:Date,
           default:Date.now
          }
})

const currentModel= mongoose.model('currentwatchings',Schema);

module.exports=currentModel