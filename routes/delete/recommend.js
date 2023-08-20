
const episodesModel = require('../../Schemas/episodes');
const moviesModel = require('../../Schemas/movies');
const recommendsModel = require('../../Schemas/recommends');
const showsModel = require('../../Schemas/Shows');
const tvsModel = require('../../Schemas/tv');
const router = require('express').Router()


router.post('/', async(req,res)=>{
  
    try{
        let results  = []
         let founds = await recommendsModel.find({user:req.body.user})
         let gott = false 
         let t = {_id:""}
         if(founds.length!==0){
                  founds.forEach(f=>{
                    if(f.media._id === req.body.media._id){
                        gott = true
                        t = f
                    }
                  })
         }
         if(gott ===false) return res.json({failed:true,message:"No recommend found, something went wrong"})
       
        results = await  recommendsModel.findByIdAndDelete(t._id)
         if(req.body.type ==='movie'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await moviesModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }

        if(req.body.type ==='tv'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await  tvsModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }

        
        if(req.body.type ==='show'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await  showsModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }

        
        if(req.body.type ==='episode'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await  episodesModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }


        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;