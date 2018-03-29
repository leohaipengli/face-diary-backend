var express = require('express');
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');
var Emotion = require('../models/emotion');
var Entry = require('../models/entry');
var generalResponse = require('../tools/generalResponse');
var consts = require('../consts');
var randomString = require('../tools/randomString').randomString;
var requireLogin = require('../tools/requireLogin').requireLogin;
const request = require('request');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(consts.MEDIA_ROOT + 'photos'))
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
    // cb(null, randomString(consts.FILENAME_LENGTH) + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: consts.MAX_IMAGE_SIZE,
  },
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname).toLocaleLowerCase();
    console.log(ext);
    if (consts.ACCEPTED_IMAGE_TYPE.findIndex(function (value) { return value === ext }) === -1) {
      return cb(new Error('Only ' + consts.ACCEPTED_IMAGE_TYPE + ' are allowed'));
    }
    cb(null, true);
  }
});

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

router.use(requireLogin);

/* GET users listing. */
router.post('/detect', function(req, res, next) {
  // TODO: receive image data, store it in media files, and get a url to replace imageUrl
  // received file
  var imageUrl = req.body.url;
  // var imageUrl = req.body.url;
  options.json.url = imageUrl;
  request(options, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      if (body.length === 0) {
        // if there are no faces
        res.json(generalResponse.json(false, null, "No Face Detected"));
      } else {
        res.json(generalResponse.json(true, body[0].faceAttributes.emotion));
      }
    } else {
      res.json(generalResponse.json(false, null, body.error.message));
    }
  });
});

router.post('/upload', upload.single('photo'), function (req, res, next) {
  if (!req.file) {
    return res.json(generalResponse.json(false, null, "No file received"));
  }
  // received file
  // var fileUrl = consts.BASE_URL + '/photos' + req.file.filename;
  return res.json(generalResponse.json(true, { url: consts.BASE_URL + '/photos/' + req.file.filename }));
});

router.get('/summary', function (req, res) {
  // monthly summary
  var now = new Date();
  var last_month = new Date(now);
  last_month.setDate(now.getDate() - 1);
  Entry.find({
    author: req.user._id,
  })  // .where('createdAt').gt(last_month).lt(now)
    .populate('emotions')
    .exec(function (err, queries) {
      var emotions = new Emotion();
      for (var i = 0; i < queries.length; i++) {
        var query_emotions = queries[i].emotions;
        for (var emotion in query_emotions.schema.paths) {
          emotions[emotion] += query_emotions[emotion];
        }
      }
      for (var emotion in emotions.schema.paths) {
        emotions[emotion] /= queries.length;
      }
      return res.json(generalResponse.json(true, emotions));
    })
});


module.exports = router;