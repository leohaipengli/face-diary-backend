var express = require('express');
var passport = require('passport');
var path = require('path');
var User = require('../models/user');
var Emotion = require('../models/emotion');
var Entry = require('../models/entry');

var generalResponse = require('../tools/generalResponse');
var serveStatic = require('serve-static');

var MEDIA_ROOT = require('../consts').MEDIA_ROOT;
var requireLogin = require('../tools/requireLogin').requireLogin;
var transforms = require('../tools/transforms');
var consts = require('../consts');
var router = express.Router();

router.use(requireLogin);

router.get('/', function (req, res) {
  return res.json(generalResponse.json(true, "Welcome"));
});

router.post('/create', function (req, res) {
  // TODO: check validity of photo
  var emotions = new Emotion(req.body.emotions);
  emotions.save(function (err) {
    if (err) {
      return res.json(generalResponse.json(false, null, err.message));
    } else {
      var entry = new Entry({
        author: req.user._id,
        keywords: req.body.keywords || [],
        content: req.body.content || '',
        facePhoto: req.body.facePhoto,
        emotions: emotions._id,
      });
      entry.save(function (error) {
        if (error) {
          return res.json(generalResponse.json(false, null, error.message));
        } else {
          return res.json(generalResponse.json(true, entry._id));
        }
      });
    }
  });

});

function xform (doc, ret, options) {
  // delete ret.emotions._id;
  delete ret.__v;
  ret.facePhoto = consts.BASE_URL + '/photos/' + ret.facePhoto;
  return ret
}

router.get('/:entryId/get', function (req, res) {
  Entry.findOne({ _id: req.params.entryId, author: req.user._id })
    .populate('emotions')
    .exec(function (err, query) {
    if (err || !query) {
      return res.json(generalResponse.json(false, null, "Not Found"));
    } else {
      return res.json(generalResponse.json(true, query.toObject()));
    }
  })
});

router.get('/:entryId/delete', function (req, res) {
  Entry.findOneAndRemove({ _id: req.params.entryId, author: req.user._id }, function (err, query) {
    if (err || !query) {
      return res.json(generalResponse.json(false, null, "Not Found"));
    } else {
      return res.json(generalResponse.json(true, query._id));
    }
  })
});

router.get('/list', function (req, res) {
  Entry.find({ author: req.user._id })
    .populate('emotions')
    .select('-content')
    .sort('-createdAt')
    .exec(function (err, queries) {
      if (err) {
        return res.json(generalResponse.json(false, null, err.message));
      } else {
        return res.json(generalResponse.json(true, queries));
      }
    })
});

module.exports = router;
