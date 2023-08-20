const router = require('express').Router();
const UniqueStringGenerator = require('unique-string-generator');
const moment = require('moment');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const readline = require('readline');
const bodyParser = require('body-parser');
// let Socket = require('../../index')

    // Function to format bytes to KB, MB, or GB
    function formatBytes(bytes) {
      if (bytes < 1024) {
        return bytes + ' B';
      } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
      } else if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
      } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
      }
    }


module.exports = (io) => {
  // Use body-parser middleware to parse request body
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));


  
router.post('/', async (req, res) => {
  try {

    console.log('req found')
    const {wanted}=req.body
    const videoUrl = wanted.url;
    const formatId = wanted.format.itag;
    const detail = wanted.details
// Get the current time
const currentTime = moment();
// Add 3 minutes to thecurrent time
const expirationTime = currentTime.add(3, 'minutes');
// Format the expiration time as YYYYMMDDHHmmss
const expirationTimeFormatted = expirationTime.format('YYYYMMDDHHmmss');
// Use the expiration time as the output file name
const outputPath = `${expirationTimeFormatted}.mp4`;
    const named = `leendro.com - ${encodeURIComponent(detail.title)}.mp4`;

   // Global constants
let ref = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
ref= videoUrl
const tracker = {
  start: Date.now(),
  audio: { downloaded: 0, total: Infinity },
  video: { downloaded: 0, total: Infinity },
  merged: { frame: 0, speed: '0x', fps: 0 },
};


// const socket = Socket.socket

// Extract itag from user request, e.g. from req.query.itag or req.params.itag

// console.log("req socket ", req.socketId)
let info =wanted.format
// Get available formats for the video
  // Filter formats based on itag value
  const videoFormat = info
  //const quality = `${videoFormat.mimeType.split(';')[0]}; codecs="${videoFormat.codecs}"`;
  const quality = videoFormat.mimeType
  if(!videoFormat) return res.json({failed:true,message:"No itag found with the sent  one!"})
  
    // Download video and audio streams based on filtered format
   const audio = ytdl(ref, { quality: 'highestaudio' })
  .on('progress', (_, downloaded, total) => {
    tracker.audio = { downloaded, total };
     const progress = Math.floor((downloaded / total) * 100); // Calculate progress percentage
        const totalFormatted = formatBytes(total); // Format total size in KB, MB, or GB
        const done = progress === 100; // Check if download is complete
        // Emit progress and done status to the client
       io.emit('audio-progress', { progress, total: totalFormatted, done });
  });

   const  video = ytdl(ref, { quality:videoFormat.itag})
      .on('progress', (_, downloaded, total) => {
        tracker.video = { downloaded, total };
        const progress = Math.floor((downloaded / total) * 100); // Calculate progress percentage
        const totalFormatted = formatBytes(total); // Format total size in KB, MB, or GB
        const done = progress === 100; // Check if download is complete
        // Emit progress and done status to the client
       io.emit('video-progress', { progress, total: totalFormatted, done });
        // io.to(req.socketId).emit
//io.to(req.socketId).emit
      });

// Prepare the progress bar
let progressbarHandle = null;
const progressbarInterval = 1000;
const showProgress = () => {
  readline.cursorTo(process.stdout, 0);
  const toMB = i => (i / 1024 / 1024).toFixed(2);

  process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
  process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

  process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
  readline.moveCursor(process.stdout, 0, -3);
};

// Start the ffmpeg child process
const ffmpegProcess = cp.spawn(ffmpeg, [
  // Remove ffmpeg's console spamming
  '-loglevel', '8', '-hide_banner',
  // Redirect/Enable progress messages
  '-progress', 'pipe:3',
  // Set inputs
  '-i', 'pipe:4',
  '-i', 'pipe:5',
  // Map audio & video from streams
  '-map', '0:a',
  '-map', '1:v',
  // Keep encoding
  '-c:v', 'copy',
  // Define output file
  outputPath,
], {
  windowsHide: true,
  stdio: [
    /* Standard: stdin, stdout, stderr */
    'inherit', 'inherit', 'inherit',
    /* Custom: pipe:3, pipe:4, pipe:5 */
    'pipe', 'pipe', 'pipe',
  ],
})
ffmpegProcess.on('close', () => {
  // Cleanup
  process.stdout.write('\n\n\n\n');
 clearInterval(progressbarHandle);
 console.log('done');
 return res.json({message:'Done',link:outputPath,named})
});
// Link streams
// FFmpeg creates the transformer streams and we just have to insert / read data
ffmpegProcess.stdio[3].on('data', chunk => {
  // Start the progress bar
  if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
  // Parse the param=value list returned by ffmpeg
  const lines = chunk.toString().trim().split('\n');
  const args = {};
  for (const l of lines) {
    const [key, value] = l.split('=');
    args[key.trim()] = value.trim();
  }
  tracker.merged = args;
});
audio.pipe(ffmpegProcess.stdio[4]);
video.pipe(ffmpegProcess.stdio[5]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

  return router;
};



// ytdl.getInfo(videoUrl, async function(err, info) {
//   if (err) {
//     // handle error
//   } else {
//     const format = info.formats.find(f => f.itag === formatId);
//     if (!format) {
//       // handle error - format not found
//     } else {
//       // format found - proceed with merging and estimating output size
//       const videoStream =   ytdl(videoUrl, { format: format })
// const audioStream =  ytdl(videoUrl, { filter: 'audioonly' });


// await Promise.all([videoStream.on('end'), audioStream.on('end')])
// .then(() => {
//   console.log('Both streams finished downloading');
// }).catch(er=>{
//   return res.json({er})
// })

// const mergedStream = ffmpeg()
//   .input(videoStream)
//   .input(audioStream)
//   .outputOptions('-c', 'copy')
//   .on('error', function(err) {
//     // handle error
//   })
//   .on('end', function() {
//     // estimate output size
//     ffmpeg.ffprobe(outputPath, function(err, metadata) {
//       if (err) {
//         // handle error
//       } else {
//         const size = metadata.format.size;
//         return res.json({ size });
//       }
//     });
//   });


// mergedStream.save(outputPath);
//     }
//   }
// });





    // const url = req.query.url
    // const itag = req.query.itag
    // const format = req.query.format
    
    // console.log('itage ni ',itag, ' url ni ',url)
    // const videoId = await ytdl.getURLVideoID(url)
    // const info = await ytdl.getBasicInfo(url)
    
    //  res.setHeader('Content-Disposition', contentDisposition( `bandamovies.com-${UniqueStringGenerator.UniqueString()}-video.${format}`))
    //  ytdl(url,{
    //   quality:itag
    //  }).on("response", response => {
    //   // If you want to set size of file in header
    //   // res.setHeader("content-length", response.headers["content-length"]);
    // })
    // .pipe(res);
