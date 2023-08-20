const axios = require('axios');
const path = require('path');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const fileUrl = req.query.file;
    // ?file=https://ia600702.us.archive.org/31/items/LibrivoxM4bCollectionAudiobooks/1ChroniclesKJV_64kb.mp3
    const filename = path.basename(fileUrl);
    axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream'
    }).then(function(response) {
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-Length', response.headers['content-length']);
      response.data.pipe(res);
    }).catch(function(error) {
      console.log(error);
      res.status(500).send('Internal server error');
    });
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

module.exports = router;
