const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
        user:{},
        type:{type:String, default:""},
        guest:{type:Boolean, default:true},
        season:{}, 
        url:{type:String, default:""},
        show:{}, 
        movie:{},
        episode:{}, 
        created:{
        type:Date,
        default:Date.now
        }
})

const historiesModel= mongoose.model('histories',Schema);

module.exports=historiesModel