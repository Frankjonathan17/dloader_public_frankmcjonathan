
const collectionsModel = require('../../Schemas/collections');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{
        let results  = await  collectionsModel.findByIdAndDelete(req.body._id)
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa!'}).status(500)
   }
      
 })

module.exports = router;