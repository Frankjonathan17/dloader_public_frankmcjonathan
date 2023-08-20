const VideosModel = require('../Schemas/video')
const router = require('express').Router()
const fs = require('fs')
const formidable = require('formidable')


router.post('/',(req,res)=>{
        
        let PHOTOS ={dp:{data:'',contentType:'',originalFilename:''}};
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
     PHOTOS.dp.data = fs.readFileSync(files.dp.filepath)
     PHOTOS.dp.contentType=files.dp.mimetype
     PHOTOS.dp.originalFilename=files.dp.originalFilename
    }


           let us ={};
           if(available){
               us = { ...fields,...PHOTOS}
           }
           else{
               us = { ...fields}
           }

           us.updated = new Date().toLocaleDateString()
               const makeSave = async()=>{
                    try{
                          
                       let User = await VideosModel.updateOne({_id:fields._id},{
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