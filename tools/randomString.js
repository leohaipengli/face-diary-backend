var crypto = require("crypto");
exports.randomString = function (length) {
  return crypto.randomBytes(length).toString('hex');
};