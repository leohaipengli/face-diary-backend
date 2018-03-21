var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var test = require('../tools/jsonresponse');
router.get('test', function () {
  test();
});

module.exports = router;
