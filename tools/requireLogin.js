var generalResponse = require('./generalResponse');

exports.requireLogin = function (req, res, next) {
  if(!req.user) {
    return res.json(generalResponse.json(false, null, "Login Required"));
  }
  next();
};