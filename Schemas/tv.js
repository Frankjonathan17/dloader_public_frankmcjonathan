const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema


let Schema = new mongoose.Schema({
 
    title:{type:String,default:''},
    season_number:{type:Number,default:1},
    base:{type:String, default:""},
    type:{type:String,default:'tv'},
    release_date:{type:String,default:''},
    status:{type:String,default:"Released"},
    banda:{type:Boolean,default:true},
    overview:{type:String,default:''},
    poster_path:{type:String,default:''},
    backdrop_path:{type:String,default:''},
    translated:{type:String,default:'true'},
    trailer:{type:String,default:""},
    episodes:[],
    subscribers:[],
    pictures:[],
    details:{},
    views:[],
    rates:[],
    recommends:[],

    dp:{
        data:Buffer,
        contentType:String,
        originalFilename:String
       },
 cover:{
        data:Buffer,
        contentType:String,
        originalFilename:String
 },

created:{
    type:Date,
    default:Date.now
}

})

const tvsModel= mongoose.model('tvseries',Schema);

module.exports=tvsModel