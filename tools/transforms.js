var consts = require('../consts');

exports.entry_full = function (doc, ret, options) {
  delete ret.emotions._id;
  delete ret.__v;
  ret.facePhoto = consts.BASE_URL + '/photos/' + ret.facePhoto;
  return ret
};

exports.entry_brief = function (doc, ret, options) {
  ret = exports.entry_full(doc, ret, options);
  delete ret.content;
  delete ret.updatedAt;
  return ret;
};

