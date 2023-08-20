const TourModel = require('../Schemas/tour');
const ReviewsModel = require('../Schemas/reviews')
const PicturesModel = require('../Schemas/pictures');
const VideosModel = require('../Schemas/video');
const ActivitiesModel = require('../Schemas/activities');
const IdealModel = require('../Schemas/ideal')
const AnimalModel = require('../Schemas/animal')
const PriceModel = require('../Schemas/price')
const RegionModel = require('../Schemas/region')
const ComeonModel = require('../Schemas/comeon')

const {ObjectID} = require('mongodb')


exports.FindTourById =async (req,res)=>{
       try{
            let result = await TourModel.find({_id:new ObjectID(req.body.id)})
            .select("_id created updated name activities about routes price duration houses  regions offers comeon ideal mainvideo priority age animals")
            if(!result){
                return res.send([])
            }
            return res.json(result)
       }
       catch(er){
           return res.json(er)
       }
}

exports.DeleteDestination =async (req,res)=>{
    try{
        let result1rev = await ReviewsModel.updateMany({},{$pull:{destinations:{_id:req.body._id}}})
        let result1p = await PicturesModel.deleteMany({ref:req.body._id})
        let result2v= await VideosModel.deleteMany({ref:req.body._id})
         let result = await TourModel.findByIdAndDelete(new ObjectID(req.body._id)) 
          return res.json({result,result1p,result2v,result1rev})
    }
    catch(er){
        return res.json(er)
    }
}







exports.FindCoverById =(req,res,next,coverId)=>{
    TourModel.find({_id:coverId})
          .populate('cover')
          .exec((err,cover)=>{
              if(err || !cover){
                  return res.status(400).json({error:err,message:'failed to find song with that Id'})
              }
              req.image = cover
              next()
          });
}

exports.FinddpById =(req,res,next,dpId)=>{
    TourModel.find({_id:dpId})
          .populate('dp')
          .exec((err,dp)=>{
              if(err || !dp){
                  return res.status(400).json({error:err,message:'failed to find song with that Id'})
              }
              req.image = dp
              next()
          });
}



exports.createActivity=async(req,res)=>{
           try{
             let Activity = new ActivitiesModel(req.body);
              await Activity.save();
             return res.json(Activity)
           }
           catch(er){
               return res.json(er).status(500)
           }
}


exports.getActivity=async(req,res)=>{
    try{
      let Activities = await ActivitiesModel.find()  
      .sort({created:-1})
      return res.json(Activities)
    }
    catch(er){
        return res.json(er)
    }
}

exports.createIdeal=async(req,res)=>{
    try{
      let Ideal = new IdealModel(req.body);
       await Ideal.save();
      return res.json(Ideal)
    }
    catch(er){
        return res.json(er)
    }
}



exports.getIdeals=async(req,res)=>{
    try{
      let Ideals = await IdealModel.find()
      .sort({created:-1})  
      return res.json(Ideals)
    }
    catch(er){
        return res.json(er)
    }
}


exports.createAnimal=async(req,res)=>{
    try{
      let Animal = new AnimalModel(req.body);
       await Animal.save();
      return res.json(Animal)
    }
    catch(er){
        return res.json(er)
    }
}



exports.getAnimals=async(req,res)=>{
    try{
      let Animal = await AnimalModel.find() 
      return res.json(Animal)
    }
    catch(er){
        return res.json(er)
    }
}


exports.createPrice=async(req,res)=>{
    try{
      let   Price = new PriceModel(req.body);
       await Price.save();
      return res.json(Price)
    }
    catch(er){
        return res.json(er)
    }
}


exports.getPrices=async(req,res)=>{
    try{
      let Price = await PriceModel.find()  
      .sort({created:-1})
      return res.json(Price)
    }
    catch(er){
        return res.json(er)
    }
}



exports.createRegion=async(req,res)=>{
    try{
      let   Region = new RegionModel(req.body);
       await Region.save();
      return res.json(Region)
    }
    catch(er){
        return res.json(er)
    }
}



exports.getRegions=async(req,res)=>{
    try{
      let Region = await RegionModel.find()  
      return res.json(Region)
    }
    catch(er){
        return res.json(er)
    }
}




exports.getComeon=async(req,res)=>{
    try{
      let Comeon = await ComeonModel.find()  
      return res.json(Comeon)
    }
    catch(er){
        return res.json(er)
    }
}


exports.createComeon=async(req,res)=>{
    try{
      let   Comeon = new ComeonModel(req.body);
       await Comeon.save();
      return res.json(Comeon)
    }
    catch(er){
        return res.json(er)
    }
}

