const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema


let Schema = new mongoose.Schema({
 
    ref:{type:String,default:''},
    episode_number:{type:Number,default:1},
    key:{type:String,default:''},
    type:{type:String,default:'episode'},
    release_date:{type:String,default:''},
    runtime:{type:Number,default:0},
    banda:{type:Boolean,default:true},
    overview:{type:String,default:''},
    player:{type:String, default:""},
    pictures:[],
    backdrop_path:{type:String,default:''},
    dj:{type:String ,default:''},
    translated:{type:String,default:'true'},
    captions:{type:String, default:'false'},
    comments:[],
    rated:[],
    shares:[],
    views:[],
    downloads:[],
    details:{},
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

const episodesModel= mongoose.model('tvepisodes',Schema);

module.exports=episodesModel