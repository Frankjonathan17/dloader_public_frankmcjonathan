const mongoose = require('mongoose');

let BlogsSchema = new mongoose.Schema({

        email:{type:String},
        name:{type:String},
        ref:{type:String},
        comment:{type:String},   
        likes:{type:Number,default:0},
        dislikes:{type:Number,default:0},
        updated:{
        type:Date,
        default:Date.now
        },
        created:{
        type:Date,
        default:Date.now
        }
        
})

const BlogCommentsModel= mongoose.model('blogcomments',BlogsSchema);

module.exports=BlogCommentsModel