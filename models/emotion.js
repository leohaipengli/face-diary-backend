var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var emotionSchema = new Schema({
  anger: { type: Number, min: 0, max: 1, required: true },
  contempt: { type: Number, min: 0, max: 1, required: true },
  disgust: { type: Number, min: 0, max: 1, required: true },
  fear: { type: Number, min: 0, max: 1, required: true },
  happiness: { type: Number, min: 0, max: 1, required: true },
  neutral: { type: Number, min: 0, max: 1, required: true },
  sadness: { type: Number, min: 0, max: 1, required: true },
  surprise: { type: Number, min: 0, max: 1, required: true }
});

// transform
if (!emotionSchema.options.toObject) emotionSchema.options.toObject = {};
emotionSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret.__v;
  delete ret._id;
  return ret;
};

var Emotion = mongoose.model('Emotion', emotionSchema);
module.exports = Emotion;

