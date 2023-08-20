
const replyModel = require('../../Schemas/replies');
const router = require('express').Router()
router.post('/', async(req,res)=>{
    
    try{

        let Create  = await replyModel.findByIdAndDelete(req.body._id)

        return res.json(Create)
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;