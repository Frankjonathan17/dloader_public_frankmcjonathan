const UserModel = require('../Schemas/user')
const router = require('express').Router()
const fs = require('fs')
const formidable = require('formidable')


router.post('/',(req,res)=>{
        
        let PHOTOS ={photo:{data:'',contentType:'',originalFilename:''},dp:{data:'',contentType:'',originalFilename:''}};
        let form = new formidable.IncomingForm();
         form.keepExtensions=true;
         
         form.parse(req,(err,fields,files)=>{
               if(err){
                   return res.status(400).json({
                        error:err,message:'fomu imeifeli kwenye kuhifadhi,'
                   })
         }      
         
        
    let available = false;
    if(files.dp){
       available = true;
      if(files.photo===undefined){
        PHOTOS ={dp:{data:'',contentType:'',originalFilename:''}};
       }
     PHOTOS.dp.data = fs.readFileSync(files.dp.filepath)
     PHOTOS.dp.contentType=files.dp.mimetype
     PHOTOS.dp.originalFilename=files.dp.originalFilename
    }

    if(files.photo){
            available = true;
        if(files.dp===undefined){
                PHOTOS ={photo:{data:'',contentType:'',originalFilename:''}};
               }
        PHOTOS.photo.data = fs.readFileSync(files.photo.filepath)
        PHOTOS.photo.contentType=files.photo.mimetype
        PHOTOS.photo.originalFilename=files.photo.originalFilename
       }
           let us ={};
           if(available){
               us = { ...fields,...PHOTOS}
           }
           else{
               us = { ...fields}
           }

           us.updated = new Date().toLocaleDateString()
//  console.log('us ni ', us)
               const makeSave = async()=>{
                    try{
                          
                       let User = await UserModel.updateOne({_id:fields._id},{
                           $set:us
                       });
                       let userr = User;
                       userr.key=undefined;
                       
                       return res.json(User)
                    }
                    catch(er){
                     return res.json({error:er,message:'express server imeshindwa hifadhi Destination!'})
                    }
               }
    
                makeSave();
         })
    
})

module.exports = router;