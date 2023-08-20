const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema

let  Schema = new mongoose.Schema({

        type:{type:String, default:""},
        user:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        movie:{type:mongoose.Schema.Types.ObjectId, ref:"movies"},
        show:{type:mongoose.Schema.Types.ObjectId, ref:"shows"},
        episodes:[],
        created:{
           type:Date,
           default:Date.now
          }
})

const completedModel= mongoose.model('completed',Schema);

module.exports=completedModel