const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema


let Schema = new mongoose.Schema({
 
    title:{type:String,default:''},
    key:{type:String,default:''},
    type:{type:String,default:'movie'},
    runtime:{type:Number,default:0},
    release_date:{type:String,default:''},
    popularity:{type:String,default:'1'},
    banda:{type:Boolean,default:true},
    overview:{type:String,default:''},
    poster_path:{type:String,default:''},
    backdrop_path:{type:String,default:''},
    adult:{type:String,default:''},
    budget:{type:String,default:''},
    revenue:{type:String,default:''},
    pictures:{},
    imdb_id:{type:String,default:''},
    captions:{type:String, default:"false"},
    tmdb_id:{type:String,default:''},
    origin_country:{type:String ,default:''},
    original_language:{type:String ,default:''},
    status:{type:String ,default:'Released'},
    dj:{type:String ,default:''},
    vote_average:{type:String ,default:'1'},
    vote_count:{type:String ,default:'1'},
    trailer:{type:String ,default:''},
    translated:{type:String,default:'true'},
    uncategorized:{type:String, default:"false"},
    rated:[],
    shares:[],
    downloads:[],
    subscribers:[],
    player:{type:String, default:""},
    genres:[],
    comments:[],
    details:{},
    completed:[],
    recommends:[],
    credits:[],
    production_companies:[],
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
Schema.index({ title: 'text' });
const moviesModel= mongoose.model('movies',Schema);
moviesModel.ensureIndexes();
module.exports=moviesModel