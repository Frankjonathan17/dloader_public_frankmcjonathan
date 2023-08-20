const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../Schemas/user');


router.post('/', async(req,res)=>{
        
          try{
            let user = await UserModel.find();
            let isMatch =  false;
            if(user[0].password===req.body.password){
                   isMatch=true;
            }
            let admin = user[0]
                  admin.photo = undefined;
                  admin.dp=undefined;
                  admin.key=undefined;
                  admin.password=undefined
                  if(isMatch){
                    return  res.json({login:true,user:admin})    
                }
               else{
                return   res.json({login:false})
                 }

        }
            catch(er){
                 res.json({er})
            }
             
     

})


module.exports = router