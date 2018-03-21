var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/me', function (req, res, next) {
  res.json({ user: req.user });
});

// TODO: require privileges
router.get('/:email/info', function (req, res, next) {
  // TODO: query and return user info
  // res.json({ user:  })
});

router.post('/register', function (req, res, next) {
  User.register(new User({ email: req.body.email }), req.body.password, function (err, user) {
    if (err) {
      return res.status(400).json( err );
    }
    passport.authenticate('local')(req, res, function () {
      res.json({ status: 'success' });
    })
  })
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.json({ status: 'success' });
});

module.exports = router;
