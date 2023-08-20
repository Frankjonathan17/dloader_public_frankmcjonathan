const mongoose = require('mongoose');

let RequestSchema = new mongoose.Schema({
       text:{type:String,default:""},
       user:{},
       tmdb_id:{type:String,default:''},
       movie_id:{type:String,default:""},
       tmdb:{type:Boolean,default:true},
       done:{type:String,default:false},
       guest:{type:Boolean,default:true},
       translated:{type:String,default:'all'},
       type:{type:String,default:'movie'},
       updated:{
        type:Date,
        default:Date.now
       },
       created:{
           type:Date,
           default:Date.now
       }
})

const RequestsModel= mongoose.model('requests',RequestSchema);

module.exports=RequestsModel