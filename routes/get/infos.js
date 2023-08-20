const router = require('express').Router();
const ytdl = require('ytdl-core')
const request = require('request');
// const { spawn } = require('child_process');
// const ffmpeg = require('ffmpeg-static');

router.post('/', async (req, res) => {
    try {
      const url = req?.body?.url?.trim();
      if (!url) return res.status(400).json({ message: 'Bad request: URL is missing' });
let ref = url

      let globalAudioSize = 0; // Global variable to store the size of the merged audio file in bytes

// Fetch video information
const infos = await ytdl.getInfo(url);

const videos = []; // Array to store video objects
const audios = []; // Array to store audio objects

// Loop through all formats in the info object
for (const format of infos.formats) {
  if (format.hasVideo && format.hasAudio) {
    // Video with both video and audio
    format.fullsize = format.size + globalAudioSize; // Calculate total size by adding global audio size
    videos.push(format);
    audios.push({ format: format, size: format.size }); // Store audio size without calculating with merged video
  } else if (format.hasVideo) {
    // Video only
    format.fullsize = format.size; // Video size is the same as full size since there's no audio to merge
    videos.push(format);
  } else if (format.hasAudio) {
    // Audio only
    format.fullsize = format.size
    audios.push( format ); // Store audio size without calculating with merged video
  }
}

// Sort videos array by fullsize in descending order
videos.sort((a, b) => b.fullsize - a.fullsize);

// Fetch highest audio format and store its size as globalAudioSize
const audio = request.get(ytdl.chooseFormat(infos.formats, { quality: 'highestaudio' }).url);
audio.on('response', (response) => {
  globalAudioSize = parseInt(response.headers['content-length']); // Update global audio size from response headers
  audio.abort(); // Abort download after getting total size
});
audio.on('error', (err) => {
  // console.error(err.message); // Handle error event
});

// Loop through videos array and start downloading
for (const video of videos) {
  const videoDownload = request.get(ytdl.chooseFormat(infos.formats, { quality: video.itag }).url);
  videoDownload.on('response', (response) => {
    video.fullsize = parseInt(response.headers['content-length']) + globalAudioSize; // Update fullsize as downloaded size + global audio size
    videoDownload.abort(); // Abort download after getting downloaded size
  });
  videoDownload.on('error', (err) => {
    // console.error(err.message); // Handle error event
  });
}

// Loop through audios array and start downloading
for (const audio of audios) {
  request.get(ytdl.chooseFormat(infos.formats, { quality: audio.itag }).url)
    .on('response', (response) => {
      audio.size = parseInt(response.headers['content-length']); // Update audio size as downloaded size
    })
    .on('error', (err) => {
      // console.error(err.message); // Handle error event
    });
}


// Use the result of videos and audios arrays and the info object
// console.log(videos);
// console.log(audios);



      let info;
      try {info = await ytdl.getBasicInfo(url);
      } catch (error) {
        console.error(error); return res.status(500).json({ message: 'Failed to get video info', failed: true });}
      if (!info) return res.status(404).json({ message: 'Video not found', failed: true });  
      const formats = info.formats.filter(format => format.container === 'mp4' || format.mimeType.includes('video/mp4'));
     
 // Create an array of video formats with estimated output size
 const formatsWithSize = [];

      // Create an array of audio formats without repetition, sorted by mimetype and audio quality
      const audioFormats = info.formats
        .filter(format => (format.mimeType && format.mimeType.includes('audio')) || format.codec === 'mp3')
        .filter((format, index, self) => index === self.findIndex(f => f.audioQuality === format.audioQuality && f.mimeType === format.mimeType))
        .sort((a, b) => {
          if (a.mimeType.includes('mp3')) return -1;
          if (a.mimeType > b.mimeType) return 1;
          if (a.mimeType < b.mimeType) return -1;
          return b.audioQuality - a.audioQuality;
        });
  
      const highestQualityThumb = info.player_response?.videoDetails?.thumbnail?.thumbnails?.reduce((prev, curr) => (prev?.width > curr?.width) ? prev : curr)
      const responseObj = {
        results: { details: info.videoDetails,
          videos, audios,
          images:[{ url: highestQualityThumb?.url,
            width: highestQualityThumb?.width,
            height: highestQualityThumb?.height
          }],
          thumbs:info?.player_response?.videoDetails?.thumbnail?.thumbnails,
          others: info.related_videos
        }, failed: false
      };
      let json = JSON.stringify(responseObj); let contentLength = Buffer.byteLength(json, 'utf8');
      res.set({'Content-Type': 'application/json','Content-Length': contentLength  }).send(json);
  
    } catch (error) {
      console.error(error); return res.status(500).json({ error, failed: true, message: 'Server imepata hitilafu!' });
    }
  });
    

module.exports = router;
