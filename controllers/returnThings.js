
 //  FUNCTION FOR GETTING TRACK COVER DATA
 exports.returnCover = async(req,res)=>{
    try{

      res.set('content-type',req.image[0].cover.contentType);
      res.set('Content-Type',req.image[0].cover.contentType);
      res.set('accept-ranges','bytes');
      return res.send(req.image[0].cover.data)
    }
    catch(er){
       return null
    }
 }

 exports.returnDp = async(req,res)=>{
    try{
res.set('content-type',req.image[0].dp.contentType);
    res.set('Content-Type',req.image[0].dp.contentType);
    res.set('accept-ranges','bytes');
    return res.send(req.image[0].dp.data)
    }
    catch(er){
       return null
    }
 }

 
 exports.returnShowDp = async(req,res)=>{
    try{
res.set('content-type',req.image[0].dp.contentType);
    res.set('Content-Type',req.image[0].dp.contentType);
    res.set('accept-ranges','bytes');
    return res.send(req.image[0].dp.data)
    }
    catch(er){
       return null
    }
 }



 
 exports.returnShowCover = async(req,res)=>{
    try{
      res.set('content-type',req.image[0].cover.contentType);
      res.set('Content-Type',req.image[0].cover.contentType);
      res.set('accept-ranges','bytes');
      return res.send(req.image[0].cover.data)
    }
    catch(er){
       return null
    }
 }



