const mongoose = require('mongoose');
const {ObjectId }= mongoose.Schema

let Schema = new mongoose.Schema({
    os:{type:String,default:''},
    name:{type:String,default:''},
    deviceId:{type:String,default:''},
    type:{type:String,default:''},
    guest:{type:Boolean,default:true},
    url:{type:String,default:''},
    pathname:{type:String,default:''},
    version:{type:String,default:''},
    country_code:{type:String,default:''},
    country_name:{type:String,default:''},
    city:{type:String,default:''},
    postal:{type:String,default:''},
    latitude:{type:Number,default:0},
    longitude:{type:Number,default:0},
    IPv4:{type:String,default:''},
    state:{type:String,default:''},
    date:{type:String,default:''},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    deviceId:{type:String,default:""},
    timeline:[],
    created:{
        type:Date,
        default:Date.now
    }

})

const VisitorModel= mongoose.model('visitorsall',Schema);

module.exports=VisitorModel