var generalResponse = require('./generalResponse');

exports.requireLogin = function (req, res, next) {
  if(!req.isAuthenticated()) {
    return res.json(generalResponse.json('unauthenticated', null, "Login Required"));
  }
  next();
};