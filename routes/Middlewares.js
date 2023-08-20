const {returnDp,returnCover,returnShowDp,returnShowCover}= require('../controllers/returnThings')

exports.returnDpNow = ('/', returnDp)
exports.returnCoverNow = ('/',returnCover)
exports.returnSDpNow = ('/',returnShowDp)
exports.returnSCoverNow= ('/',returnShowCover)



const router = require('express').Router();
const ytdl = require('ytdl-core')
  // Buildin with nodejs
const cp = require('child_process');
const readline = require('readline');
// External modules;
// const ffmpeg = require('ffmpeg-static');
const ytdlDiscord = require('ytdl-core-discord');
const ffmpegPath = require('ffmpeg-static').path;
const ffmpeg = require('fluent-ffmpeg');

// Global constants
const tracker = {
  start: Date.now(),
  audio: { downloaded: 0, total: Infinity },
  video: { downloaded: 0, total: Infinity },
  merged: { frame: 0, speed: '0x', fps: 0 },
};

// INFO GETTING SAVED
// router.get('/', async (req, res) => {
//     try {
//    const ref = req.body.url
//    const youtubeUrl = 'https://www.youtube.com/watch?v=JrDptSOXDvc';
//    let url=youtubeUrl
//     const videoInfo = await ytdl.getInfo(youtubeUrl);

//     // Fetch the best audio format available
//     const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
//     const bestAudioFormat = audioFormats.reduce((prev, current) => prev.audioBitrate > current.audioBitrate ? prev : current);
    
//     // Download the audio stream as a buffer
//     const audioStream = await ytdlDiscord(youtubeUrl, { filter: 'audioonly', quality: bestAudioFormat.itag });
//     //console.log('Best audio format:', bestAudioFormat);
//     // Calculate estimated output size for each video
//     const results = [];
//     for (const format of videoInfo.formats) {
//       if (!format.hasVideo) continue;
      
//       const videoBitrate = format.videoBitrate;
//       const videoDuration = parseInt(videoInfo.videoDetails.lengthSeconds);
//       const audioBitrate = bestAudioFormat.audioBitrate;
      
//       // Calculate the estimated file size using ffmpeg-static
//       const command = ffmpeg()
//         .input(audioStream)
//         .inputOptions('-f s16le')
//         .inputFormat('s16le')
//         .inputFps(44100)
//         .input('pipe:')
//         .inputOptions('-f mp4')
//         .inputFormat('mp4')
//         .videoBitrate(videoBitrate)
//         .duration(videoDuration)
//         .audioCodec('aac')
//         .audioBitrate(audioBitrate)
//         .on('error', function(err) {
//           console.log('An error occurred: ' + err.message);
//         })
//         .on('end', function() {
//           console.log('Processing finished !');
//         })
//         .ffprobe(async function(err, data) {
//           const estimatedFileSize = data?.format?.size;
//           format.estimatedFileSize = estimatedFileSize;
//           results.push(format);
//         })
      
//       await command;
//     }

//    return res.send(results);



//  res.header("Content-Disposition", `attachment;  filename=.mp4`)
// let video = ytdl(url,{filter:'videoonly'})
// let audio = ytdl(url, {filter: 'audioonly', highWaterMark: 1<<25});

// const ffmpegProcess = cp.spawn(ffmpeg, [
//     '-i', `pipe:3`,
//     '-i', `pipe:4`,
//     '-map','0:v',
//     '-map','1:a',
//     '-c:v', 'copy',
//     '-c:a', 'libmp3lame',
//     '-crf','27',
//     '-preset','veryfast',
//     '-movflags','frag_keyframe+empty_moov',
//     '-f','mp4',
//     '-loglevel','error',
//     '-'
// ], {
//     stdio: [
//     'pipe', 'pipe', 'pipe', 'pipe', 'pipe',
//     ],
// });

// video.pipe(ffmpegProcess.stdio[3]);
// audio.pipe(ffmpegProcess.stdio[4]);
// ffmpegProcess.stdio[1].pipe(res);

// let ffmpegLogs = ''

// ffmpegProcess.stdio[2].on(
//     'data',
//     (chunk)=>{ffmpegLogs += chunk.toString()}
// )

// ffmpegProcess.on(
//     'exit',
//     (exitCode)=>{
//         if(exitCode === 1){
//             console.error(ffmpegLogs)
//         }
//     }
// )








// //     // Get audio and video streams
// // const audio = ytdl(ref, { quality: 'highestaudio' })
// //   .on('progress', (_, downloaded, total) => {
// //     tracker.audio = { downloaded, total };
// //   });
// // const video = ytdl(ref, { quality: 'highestvideo' })
// //   .on('progress', (_, downloaded, total) => {
// //     tracker.video = { downloaded, total };
// //   });

// // // Prepare the progress bar
// // let progressbarHandle = null;
// // const progressbarInterval = 1000;
// // const showProgress = () => {
// //   readline.cursorTo(process.stdout, 0);
// //   const toMB = i => (i / 1024 / 1024).toFixed(2);

// //   process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
// //   process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

// //   process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
// //   process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

// //   process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
// //   process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

// //   process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
// //   readline.moveCursor(process.stdout, 0, -3);
// // };

// // // Start the ffmpeg child process
// // const ffmpegProcess = cp.spawn(ffmpeg, [
// //   // Remove ffmpeg's console spamming
// //   '-loglevel', '8', '-hide_banner',
// //   // Redirect/Enable progress messages
// //   '-progress', 'pipe:3',
// //   // Set inputs
// //   '-i', 'pipe:4',
// //   '-i', 'pipe:5',
// //   // Map audio & video from streams
// //   '-map', '0:a',
// //   '-map', '1:v',
// //   // Keep encoding
// //   '-c:v', 'copy',
// //   // Define output file
// //   'out.mkv',
// // ], {
// //   windowsHide: true,
// //   stdio: [
// //     /* Standard: stdin, stdout, stderr */
// //     'inherit', 'inherit', 'inherit',
// //     /* Custom: pipe:3, pipe:4, pipe:5 */
// //     'pipe', 'pipe', 'pipe',
// //   ],
// // });
// // ffmpegProcess.on('close', () => {
// //   console.log('done');
// //   // Cleanup
// //   process.stdout.write('\n\n\n\n');
// //   clearInterval(progressbarHandle);
// // });

// // // Link streams
// // // FFmpeg creates the transformer streams and we just have to insert / read data
// // ffmpegProcess.stdio[3].on('data', chunk => {
// //   // Start the progress bar
// //   if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
// //   // Parse the param=value list returned by ffmpeg
// //   const lines = chunk.toString().trim().split('\n');
// //   const args = {};
// //   for (const l of lines) {
// //     const [key, value] = l.split('=');
// //     args[key.trim()] = value.trim();
// //   }
// //   tracker.merged = args;
// // });
// // audio.pipe(ffmpegProcess.stdio[4]);
// // video.pipe(ffmpegProcess.stdio[5]);
  

// //       if (!url) return res.status(400).json({ message: 'Bad request: URL is missing' });
// //       let info;
      
// //       try {info = await ytdl.getBasicInfo(url);
// //       } catch (error) {
// //         console.error(error); return res.status(500).json({ message: 'Failed to get video info', failed: true });}
// //       if (!info) return res.status(404).json({ message: 'Video not found', failed: true });  
// //       const formats = info.formats.filter(format => format.container === 'mp4' || format.mimeType.includes('video/mp4'));

// //       // Create an array of audio formats without repetition, sorted by mimetype and audio quality
// //       const audioFormats = info.formats
// //         .filter(format => (format.mimeType && format.mimeType.includes('audio')) || format.codec === 'mp3')
// //         .filter((format, index, self) => index === self.findIndex(f => f.audioQuality === format.audioQuality && f.mimeType === format.mimeType))
// //         .sort((a, b) => {
// //           if (a.mimeType.includes('mp3')) return -1;
// //           if (a.mimeType > b.mimeType) return 1;
// //           if (a.mimeType < b.mimeType) return -1;
// //           return b.audioQuality - a.audioQuality;
// //         });

// //         // Choose the first audio format from the sorted audioFormats array
// // const audio = audioFormats[0];

// // // Loop through each video format and calculate the expected file size when merged with the chosen audio
// // const videosWithSize = await Promise.all(formats.map(async (format) => {
// //   const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 -sexagesimal -i ${format.url} -i ${audio.url} -c copy -map 0:v:0 -map 1:a:0 -f null -`;
// //   const result = await ffprobe(command, { path: ffprobeStatic.path });
// //  // Extract the duration of the video from the info object
// // const duration = formats.player_response.videoDetails.lengthSeconds;
// //   const audioBitrate = audio.averageBitrate || audio.bitrate;
// //   const videoBitrate = format.averageBitrate || format.bitrate;
// //   const sizeInBytes = (audioBitrate + videoBitrate) / 8 * duration;
// //   const sizeInMB = sizeInBytes / 1024 / 1024;
// //   const sizeInGB = sizeInMB / 1024;
// //   return {
// //     ...format,
// //     expectedSize: sizeInGB >= 1 ? `${sizeInGB.toFixed(2)} GB` : `${sizeInMB.toFixed(2)} MB`
// //   };
// // }));


  
// //       const highestQualityThumb = info.player_response?.videoDetails?.thumbnail?.thumbnails?.reduce((prev, curr) => (prev?.width > curr?.width) ? prev : curr)
// //       const responseObj = {
// //         results: {
// //           details: info.videoDetails,
// //           videos: videosWithSize, // Replace 'formats' with 'videosWithSize'
// //           audios: audioFormats,
// //           images: [{
// //             url: highestQualityThumb?.url,
// //             width: highestQualityThumb?.width,
// //             height: highestQualityThumb?.height
// //           }],
// //           thumbs: info?.player_response?.videoDetails?.thumbnail?.thumbnails,
// //           others: info.related_videos
// //         },
// //         failed: false
// //       }

// //     let json = JSON.stringify(responseObj);
// // // Sum up the expected file sizes of all videos and add to the content length
// // const totalSize = videosWithSize.reduce((acc, cur) => {
// //   const sizeInBytes = cur.expectedSize.endsWith('GB')
// //     ? parseFloat(cur.expectedSize) * 1024 * 1024 * 1024
// //     : parseFloat(cur.expectedSize) * 1024 * 1024;
// //   return acc + sizeInBytes;
// // }, 0);
// // const contentLength = Buffer.byteLength(json, 'utf8') + totalSize;
// // res.set({
// //   'Content-Type': 'application/json',
// //   'Content-Length': contentLength
// // }).send(json);

  
//     } catch (error) {
//       console.error(error); return res.status(500).json({ error, failed: true, message: 'Server imepata hitilafu!' });
//     }
//   });
    

// module.exports = router;
