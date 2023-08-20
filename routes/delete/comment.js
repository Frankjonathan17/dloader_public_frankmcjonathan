
const commentsModel = require('../../Schemas/comments');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{

        let Create  = await commentsModel.findByIdAndDelete(req.body._id)

        return res.json(Create)
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;