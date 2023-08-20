const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    userId:{type:String,default:""},
    movie:{},
    date:{type:String, default:""},
    created:{
        type:Date,
        default:Date.now
    }

})

const watchHistoryModel= mongoose.model('watchhistory',Schema);

module.exports = watchHistoryModel