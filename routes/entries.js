var express = require('express');
var passport = require('passport');
var path = require('path');
var User = require('../models/user');
var Entry = require('../models/entry');
var generalResponse = require('../tools/generalResponse');
var serveStatic = require('serve-static');

var MEDIA_ROOT = require('../consts').MEDIA_ROOT;
var router = express.Router();

module.exports = router;
