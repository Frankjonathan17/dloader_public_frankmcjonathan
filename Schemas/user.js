const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({

    name:{type:String,default:"" },
    vip:{type:Boolean,default:false},
    verified:{default:false,type:Boolean},
    key:{type:Number, default:Math.random(43843569281017)*100000000},    
    password:{type:String},
    email:{type:String},
    firstName:{type:String,default:''},
    lastName:{type:String,default:''},
    gender:{type:String,default:''},
    from:{type:String,default:'Tanzania'},
    number:{type:String,default:''},
    hasDp:{type:Boolean, default:false},
    hasCover:{type:Boolean, default:false},
    bio:{type:String,default:""},
    rank:{type:String,default:""},
    country:{type:String,default:''},
    genres:[],
    services:[],
    geolocations:[],
    notifyTypes:[],
    block:{type:Boolean,default:false},
    blockTypes:[],
    moviesFollowing:[],
    showsFollowing:[],
    moviesCompleted:[],
    showsCompleted:[],
    messages:[],
    watched:[],
    playlists:[],
    payments:[],
    watchHistory:[],
    recommends:[],
    following:[],
    followers:[],
    authHistory:[],
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
       },
       updated:{
        type:Date,
        default:Date.now
    }
})

const UserModel= mongoose.model('users',UserSchema);



module.exports=UserModel