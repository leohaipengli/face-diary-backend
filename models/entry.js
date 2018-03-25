var mongoose = require('mongoose');
var consts = require('../consts');

var Schema = mongoose.Schema;

var entrySchema = new Schema({
  // author, bond to user
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // text part of diary: keywords
  keywords: [{ type: String, max: 40 }],
  // createAt
  // updatedAt
  content: { type: String, max: 1000 },
  // path of photo
  facePhoto: { type: String,  max: 200, required: true},
  // get from azure api
  emotions: { type: Schema.Types.ObjectId, ref: 'Emotion', required: true }
},
{
  // update date field (createdAt, updatedAt) of document before saved
  timestamps: true,
});

// transform
if (!entrySchema.options.toObject) entrySchema.options.toObject = {};
entrySchema.options.toObject.transform = function (doc, ret, options) {
  delete ret.author;
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;
  ret.facePhoto = consts.BASE_URL + '/photos/' + ret.facePhoto;
  ret.createdAt = ret.createdAt.getTime();
  ret.updatedAt = ret.updatedAt.getTime();
  return ret;
};

// entrySchema.query.excludeMeta = function () {
//   return this.select('-__v');
// };
//
// entrySchema.query.brief = function () {
//   return this.select('-content').select('-updatedAt');
// };

// entrySchema.pre('save', setTimestamps);
var Entry = mongoose.model('Entry', entrySchema);
//Export function to create "SomeModel" model class
module.exports = Entry;
