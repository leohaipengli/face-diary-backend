var express = require('express');
const request = require('request');

var router = express.Router();

var options = {
  url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect',
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '59c0c894449d46fe9d2d1c439575655c',
  },
  qs: {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "emotion",
  },
  json: {
    // the url of the image, added when requests received
    url: '',
  },
};

/* GET users listing. */
router.post('/detect', function(req, res, next) {
  // TODO: receive image data, store it in media files, and get a url to replace imageUrl
  var imageUrl = req.body.url;
  options.json.url = imageUrl;
  request(options, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      res.json(body);
    } else {
      res.status(400).json(body);
    }
  });
});

module.exports = router;