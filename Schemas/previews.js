const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
        user:{},
        guest:{type:Boolean,default:true},
        url:{type:String,default:"/"},
        type:{type:String,default:""},
        media:{}, 
        mediaId:{type:String,default:""},
        created:{
        type:Date,
        default:Date.now
        }
})

const previewsModel= mongoose.model('previews',Schema);

module.exports=previewsModel