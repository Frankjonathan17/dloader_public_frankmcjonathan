const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema


let Schema = new mongoose.Schema({
 
    title:{type:String,default:''},
    type:{type:String,default:'show'},
    ended:{type:String,default:'false'},
    release_date:{type:String,default:''},
    banda:{type:Boolean,default:true},
    overview:{type:String,default:''},
    popularity:{type:String,default:'1'},
    poster_path:{type:String,default:''},
    pictures:[],
    backdrop_path:{type:String,default:''},
    adult:{type:String,default:''},
    budget:{type:String,default:''},
    revenue:{type:String,default:''},
    imdb_id:{type:String,default:''},
    tmdb_id:{type:String,default:''},
    origin_country:{type:String ,default:''},
    original_language:{type:String ,default:''},
    status:{type:String ,default:'Released'},
    dj:{type:String ,default:''},
    vote_average:{type:String ,default:'1'},
    vote_count:{type:String ,default:'1'},
    trailer:{type:String ,default:''},
    translated:{type:String,default:'true'},
    captions:{type:String, default:'false'},
    production_companies:[],
    in_production:{type:String,default:'false'},
    seasons:[],
    genres:[],
    recommends:[],
    createdby:[],
    credits:[],
    details:{},
    subscribers:[],
    rated:[],
    completed:[],
    uncategorized:{type:String, default:"false"},
    created:{
        type:Date,
        default:Date.now
    },
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

})
Schema.index({ title: 'text' });
const showsModel= mongoose.model('shows',Schema);
showsModel.ensureIndexes();
module.exports=showsModel