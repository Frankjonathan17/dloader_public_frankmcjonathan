const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        type:{type:String,default:""},
        base:{type:String,default:""},
        text:{type:String,default:""},  
        season:{type:mongoose.Schema.Types.ObjectId,ref:"tvseries"},
        show:{type:mongoose.Schema.Types.ObjectId,ref:"shows"},
        episode:{type:mongoose.Schema.Types.ObjectId,ref:"tvepisodes"},
        movie:{type:mongoose.Schema.Types.ObjectId,ref:"movies"},
        likes:[],
        dislikes:[],
        updated:{
        type:Date,
        default:Date.now
        },
        created:{
        type:Date,
        default:Date.now
        }
        
})

const replyModel= mongoose.model('replies',Schema);

module.exports=replyModel