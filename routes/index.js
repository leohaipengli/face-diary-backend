var express = require('express');
var generalResponse = require('../tools/generalResponse');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// sample json response api
router.get('/test', function (req, res, next) {
  res.json(generalResponse.json(true, "success!"));
});

module.exports = router;
