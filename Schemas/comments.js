const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
        
        type:{type:String,default:""},
        base:{type:String,default:""},
        user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        text:{type:String,default:""}, 
        season:{type:mongoose.Schema.Types.ObjectId,ref:"tvseries"},
        show:{type:mongoose.Schema.Types.ObjectId,ref:"shows"},
        episode:{type:mongoose.Schema.Types.ObjectId,ref:"tvepisodes"},
        movie:{type:mongoose.Schema.Types.ObjectId,ref:"movies"},
        likes:[],
        dislikes:[],
        hidden:{type:Boolean,default:false},
        updated:{
        type:Date,
        default:Date.now
        },
        created:{
        type:Date,
        default:Date.now
        }
        
})

const commentsModel= mongoose.model('comments',Schema);

module.exports=commentsModel