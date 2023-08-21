const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const { Buffer } = require('buffer');
const axios = require('axios')
var mime = require('mime');
const path = require('path');
const http = require('http').Server(app)
const audioDownload = require('./routes/download/audio')
const fs = require('fs');
const glob = require('glob');
const moment = require('moment');
const cron = require('node-cron')
const getImages  = require('./routes/get/image')
const io = require('socket.io')(http,{
  cors:{
    origin:['http://localhost:3000','http://localhost:3001','http://localhost:3002','https://dloader.netlify.app']
  }
})



// imports
const getVideoInfos = require('./routes/get/infos')
const downnloadAnyAudio = require('./routes/download/AnyFree')
app.use(express.urlencoded({extended: true}));app.use(cors());app.use(express.json());

// A middleware to add the socket id to the request object
app.use((req, res, next) => {
  req.socketId = io.sockets.sockets.keys().next().value; // Get the last connected socket id
  next();
});


io.on('connection',socket=>{
  //console.log(socket?.id)
  exports.socket = socket;

  socket.on('disconnect', () => {
    //console.log(socket?.id,'disconnected')
  });

  // Emit the event to the client when it is connected
  socket.emit('image-progress-fetch','Welcome to the server');
// Pass the io object to routes/download/index.js


});
app.use('/api/get/images',getImages)
app.use('/download/video', require('./routes/download/video')(io));
app.use('/download/any/audio', downnloadAnyAudio)
app.use('/infos',getVideoInfos)
app.use('/download/audios',audioDownload)
app.get('/pakua', (req, res) => {
  let name =  decodeURIComponent(req.query.n);
  var file = path.join(__dirname, req.query.v);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename='+name);
  res.setHeader('Content-type', mimetype);

  res.download(file,name, (err) => { // Use req.query.n as the filename option
    if (err) {
      // Handle any error that occurred during download
      console.error(err);
    } else {
      // Delete the file from the server after it has been downloaded
      fs.unlink(file, (err) => {
        if (err) {
          // Handle any error that occurred during file deletion
          console.error(err);
        } else {
          console.log(`File ${file} has been deleted successfully`);
        }
      });
    }
  });
});


app.get('/', (req, res) => {
  return res.send('Ipo online dloader server')
});


app.get('/proxy', (req, res) => {
  const imageUrl = req.query.url;
  axios
    .get(imageUrl, { responseType: 'arraybuffer' })
    .then((response) => {
      const buffer = Buffer.from(response.data, 'binary');
      const extension = response.headers['content-type'].split('/')[1]; // get file extension from content type
      res.setHeader('Content-Disposition', `attachment; filename="download.${extension}"`);
      res.setHeader('Content-Type', response.headers['content-type']);
      res.send(buffer);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: 'Failed to download image' });
    });
});


app.post('/image', async (req, res) => {
  const imageUrl = req.body.url; // Get image URL from query parameter

  try {
    let loadedBytes = 0;
    let totalBytes = 0;
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      onDownloadProgress: (progressEvent) => {
        loadedBytes = progressEvent.loaded;
        totalBytes = progressEvent.total;

        const progress = Math.round((loadedBytes / totalBytes) * 100); // calculate progress in percentage

        // format total file size in KB or MB or GB
        const fileSize = totalBytes >= 1024 * 1024 * 1024
          ? `${(totalBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
          : totalBytes >= 1024 * 1024
            ? `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`
            : `${(totalBytes / 1024).toFixed(2)} KB`;

        io.emit('image-progress-fetch', { progress, size:fileSize }); // emit progress and file size
     
      },
    }); // Fetch image as arraybuffer

    const imageData = Buffer.from(response.data, 'binary').toString('base64'); // Convert image to base64
    const fileSize = response.headers['content-length']; // Get file size in bytes

    // Format file size in KB or MB
    const fileSizeFormatted = fileSize >= 1024 * 1024
      ? `${(fileSize / (1024 * 1024)).toFixed(2)} MB`
      : `${(fileSize / 1024).toFixed(2)} KB`;

    // Emit the event to all connected clients
    //io.emit('image-progress-fetch', 'DONE');
    res.json({ failed: false, results: { image:imageData, size: fileSizeFormatted } });
  } catch (error) {
    console.log(error);
    res.status(500).send({ failed: true, message: 'Error fetching image' });
  }
});


// A function that deletes a file by its path
const deleteFile = (file) => {
  console.log('deleting...')
  fs.unlink(file, (err) => {
    if (err) throw err;
    console.log(`File ${file} has been deleted successfully`);
  });
};



// A function that deletes all files with .mp4 extension in the root dir
const deleteFiles = () => {
  console.log(`Automatic files inspect & delete - ${new Date().toString()}`)
  // Get all files with .mp4 extension
  const files = glob.sync('./*.mp4');
  // Loop through the files and delete them
  for (let file of files) {
    // Get the expiration time from the file name
    const expirationTime = file.split('.')[0]; // Something like '20211231123045'
    // Parse the expiration time as a moment object
    const expirationTimeMoment = moment(expirationTime, 'YYYYMMDDHHmmss');
    // Get the current time as a moment object
    const currentTimeMoment = moment();
    // Compare the times and delete the file if expired
    if (currentTimeMoment.isSameOrAfter(expirationTimeMoment)) {
      deleteFile(file);
    }
  }
};

// Schedule a cron job that runs every 3 minutes
cron.schedule('*/1 * * * *', () => {
  deleteFiles();
});

const port = process.env.PORT || 4500
http.listen(port,()=>{
    console.log('server listen in port ',port);
})