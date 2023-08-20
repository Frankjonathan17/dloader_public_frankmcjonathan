const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        media:{}, 
        to:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        private:{type:Boolean,default:false},
        created:{
        type:Date,
        default:Date.now
        }
})

const recommendsModel= mongoose.model('recommends',Schema);
module.exports=recommendsModel