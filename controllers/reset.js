const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../Schemas/user');


router.post('/', async(req,res)=>{
        
          try{
            let user = await UserModel.find();
            let isMatch =  false;
            if(Number(user[0].key)===Number(req.body.key)){
                   isMatch=true;
            }

              if(isMatch){
                    return  res.json({reset:true})    
                }
               else{
                return   res.json({reset:false})
                 }

        }
            catch(er){
                 res.json({er})
            }
             
     

})


module.exports = router