const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema

let UserSchema = new mongoose.Schema({
     firstname:{
        type:String,
    },  
     lastname:{
        type:String,

    },
    about:{
        type:String,
    },
    box:{type:Number,default:""},
    region:{type:String,default:""},
    country:{type:String,default:""},
    street:{type:String,default:""},
    block:{type:Boolean,default:false},
    blockrequests:{type:Boolean,default:false},
    blockreviews:{type:Boolean,default:false},
    blockmessage:{type:String,default:'Unavailable at the moment, please come later!'},
    facebook:{type:String},
    map:{type:String,default:""},
    instagram:{type:String},
    youtube:{type:String},
    whatsaapgroup:{type:String},
    telegramgroup:{type:String},
    companyvideo:{type:String},
    aboutcompany:{
        type:String,
    },
    message:{
        type:String,

    },
    key:{
        type:Number,
        default:438292834347
    },
 
    numberone:{
    type:String
    },
    numbertwo:{
    type:String
    },    
    password:{
        type:String
    },
    email:{
       type:String
       },

       dp:{
        data:Buffer,
        contentType:String,
        originalFilename:String
       },
      photo:{
        data:Buffer,
        contentType:String,
        originalFilename:String
       },


       created:{
           type:Date,
           default:Date.now
       },
       
       updated:{
        type:Date,
        default:Date.now
    }
})

const adminModel= mongoose.model('admini',UserSchema);

module.exports=adminModel