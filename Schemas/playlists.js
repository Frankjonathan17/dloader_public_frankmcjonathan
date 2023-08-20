const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
        
        user:{},
        vip:{type:Boolean,default:false},
        origin:{type:String,default:'user'},
        public:{type:Boolean,default:true},
        about:{type:String,default:""},
        main:{type:String,default:""},
        title:{type:String,default:""},
        followers:[],
        members:[],
        requests:[],  
        likes:[],
        views:[],
        medias:[],
        updated:{
        type:Date,
        default:Date.now
        },
        created:{
        type:Date,
        default:Date.now
        }
      
})

const PlaylistsModel= mongoose.model('playlists',Schema);

module.exports=PlaylistsModel
  // main ni original purpose ni movies au seasons au eps?