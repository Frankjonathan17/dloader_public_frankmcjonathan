const axios = require('axios');
const path = require('path');
const router = require('express').Router();
const sharp = require('sharp');
const blurImageUrl = require('blur-image-url');
const formidable = require('formidable');
const fs = require('fs')
const FormData = require('form-data');
const apiUrl  = 'https://api.imgbb.com/1/upload';
const key = 'c90d79fbc9f40f3d28ad6e44830bf9aa'

router.post('/', async (req, res) => {
  try {

    const images = []
    
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    
    form.parse(req,(err,fields,files)=>{
          if(err){
              return res.status(400).json({
                   error:err,message:'fomu imeifeli kwenye kuhifadhi,'
              })
    }          
    
    })


       // listen for file event to get each file
form.on('file', function(name, file) {

    images.push(file)

  });
  // listen for end event to finish processing
  form.on('end', function() {

    console.log('done read images');
    let pending = images
    let completed = []

    if(pending?.length ===0){
       return res.json({results:[]})
    }

    let filename = ""


const handleBlurImage=async(imageAsFile,returnToBlur)=>{
     try{
        console.log('blur received file')
       filename = imageAsFile?.originalFilename

       const waitUrrl =async(f)=>{
         let dataUrl = await fileToBase64(f)
         if(returnToBlur !== undefined){
           handleCompressionStart(0.102,dataUrl,undefined,false,undefined)
         }else{
           handleCompressionStart(0.102,dataUrl,undefined,false,true)
         }
         
       }

      let image  = imageAsFile
     let oneImage = {}
   //   read the file data as a buffer
    let buffer = fs.readFileSync(image.filepath);
    // convert the buffer to a base64 string
    let base64 = Buffer.from(buffer).toString('base64');
    // create a data URI for the image
    let dataURI = `data:${image.mimetype};base64,${base64}`


    // use sharp to convert the image to JPEG format with a quality of 80
 let compressed = await sharp(buffer).toFormat('webp', {quality: 60}).toBuffer();
   base64 = await Buffer.from(compressed).toString('base64');
// // use sharp to blur the image with a sigma value of 10


  //  dataURI = `data:${image.mimetype};base64,${base64}`
 let compressedThumb = await sharp(buffer).toFormat('webp', {quality: 2}).toBuffer();
// use sharp to blur the image with a sigma value of 10
  let blurred = await sharp(compressedThumb).blur(60).toBuffer();
   let base64Thumb = Buffer.from(blurred).toString('base64');


let formData = new FormData();
formData.append('image',base64)
formData.append('name',image?.originalFilename)
formData.append('type',image?.mimetype)

const response = await axios.post(`${apiUrl}?key=${key}`, formData);
// Extract URL of blurred image from imgBB API response
let img = response.data.data;    
// append the blurred image data to another form data
let formData2 = new FormData();
formData2.append('image',base64Thumb)
formData2.append('name',image?.originalFilename)
formData2.append('type',image?.mimetype)

const response2 = await axios.post(`${apiUrl}?key=${key}`, formData2);
 img.blur =  response2.data.data;    
  completed.push(img)
   let re = []
   pending.forEach((m,i)=>{
    if(i !== 0){
      re.push(m)
    }
   })
  pending = re
  if(re.length !==0){
    handleBlurImage(pending[0])
  }
  else{
    return res.json({results:completed})
  }

     }catch(er){
       console.log({er,from:'blur'})
       return res.json({er,from:'blur'}).status(500)
     }
}

if(pending.length !== 0){
  handleBlurImage(pending[0])
}else{
  return res.json({results:completed})
}

  });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

module.exports = router;
