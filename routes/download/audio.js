const axios = require('axios');
const contentDisposition = require('content-disposition');
const path = require('path');
const router = require('express').Router();
const ytdl = require('ytdl-core');

router.get('/', async (req, res) => {
  try {

    const url = req.query.url
    const itag = req.query.itag
    const name = decodeURIComponent(req.query.name);


     res.setHeader('Content-Disposition', contentDisposition( `leendro.com-${name}.${'mp3'}`))
     ytdl(url,{
      quality:itag
     }).on("response", response => {
   
  res.setHeader("content-length", response.headers["content-length"]);
  
    })
    .pipe(res);



  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

module.exports = router;
