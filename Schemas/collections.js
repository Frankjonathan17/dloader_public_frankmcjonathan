const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
        
        collectedby:{type:String},
        media:{},
        episodes:[],
        text:{type:String,default:""},  
        sharing:{type:Boolean,default:false},
        hidden:{type:Boolean,default:false},
        shares:[],
        updated:{
            type:Date,
        default:Date.now
        },
        created:{
        type:Date,
        default:Date.now
        }
        
})

const collectionsModel= mongoose.model('collections',Schema);

module.exports=collectionsModel