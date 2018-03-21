var express = require('express');
var generalResponse = require('../tools/generalResponse');
var consts =require('../consts');
const request = require('request');

var router = express.Router();

var options = {
  url: consts.EMOTION_API_URL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': consts.EMOTION_API_KEY,
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
      if (body.length === 0) {
        // if there are no faces
        res.json(generalResponse.json(false, null, "No Face Detected"));
      } else {
        res.json(generalResponse.json(true, {emotions: body[0].faceAttributes.emotion}));
      }
    } else {
      res.json(generalResponse.json(false, null, body.error.message));
    }
  });
});

module.exports = router;