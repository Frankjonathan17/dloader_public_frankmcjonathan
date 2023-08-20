const HomestayModel = require('../Schemas/homestay');
const PicturesModel = require('../Schemas/pictures');
const TourModel = require('../Schemas/tour');
const {ObjectID} = require('mongodb')
const formidable = require('formidable');
const fs = require('fs');





exports.BuildHomeStayPartOne=async(req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    
    form.parse(req,(err,fields,files)=>{
          if(err){
              return res.status(400).json({
                   error:err,message:'fomu imeifeli kwenye kuhifadhi,'
              })
    }          
        
   let Homestay = new HomestayModel(fields);

      if(files.dp){
             
        Homestay.dp.data = fs.readFileSync(files.dp.filepath)
        Homestay.dp.contentType=files.dp.mimetype
        Homestay.dp.originalFilename=files.dp.originalFilename
}
      
          const makeSave = async()=>{
               try{
                    let ress  =  await Homestay.save()
                    return res.json(ress)
               }
               catch(er){
                return res.json({error:er,message:'express server imeshindwa hifadhi Homestay!'})
               }
          }

          makeSave();
    })
}



exports.UpdateProfileHomestay=async(req,res)=>{

    let PHOTOS ={dp:{data:'',contentType:'',originalFilename:''}};
    let form = new formidable.IncomingForm();
     form.keepExtensions=true;
     
     form.parse(req,(err,fields,files)=>{
           if(err){
               return res.status(400).json({
                    error:err,message:'fomu imeifeli kwenye kuhifadhi,'
               })
     }      
     

if(files.dp){
 PHOTOS.dp.data = fs.readFileSync(files.dp.filepath)
 PHOTOS.dp.contentType=files.dp.mimetype
 PHOTOS.dp.originalFilename=files.dp.originalFilename
}
       
           const makeSave = async()=>{
                try{
                   let Homestay = await HomestayModel.updateOne({_id:fields._id},{
                       $set:PHOTOS
                   });
              
                   return res.json(Homestay)
                }
                catch(er){
                 return res.json({error:er,message:'express server imeshindwa hifadhi Destination!'})
                }
           }

            makeSave();
     })

}


exports.getHomestays=async(req,res)=>{
    
    try{
        let result = await HomestayModel.find()
        .select("_id created updated name regions expensive")
        .sort({created:-1})

         return res.json(result)
   }
   catch(er){
       return res.json(er)
   }

}


exports.getSingleHome=async(req,res)=>{

    try{
        let result = await HomestayModel.find({_id:req.body._id})
        .select("_id created updated name regions expensive")
        if(!result){
            return res.send([])
        }
         return res.json(result)
   }
   catch(er){
       return res.json(er)
   }

}


exports.DeleteHomestay = async (req,res)=>{
    try{
        let result1p = await PicturesModel.deleteMany({ref:req.body._id})
        let result1emb = await TourModel.updateMany({},{$pull:{houses:{_id:req.body._id}}})
         let result = await HomestayModel.findByIdAndDelete(new ObjectID(req.body._id)) 
          return res.json({result1p,result1emb,result})
    }
    catch(er){
        return res.json(er)
    }
}



exports.FinddpByIdHomePIC =(req,res,next,pId)=>{
    HomestayModel.find({_id:pId})
          .populate('dp')
          .exec((err,dp)=>{
              if(err || !dp){
                  return res.status(400).json({error:err,message:'failed to find song with that Id'})
              }
              req.image = dp
              next()
          });
}

