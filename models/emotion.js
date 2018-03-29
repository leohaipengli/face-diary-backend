var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var emotionSchema = new Schema({
  anger: { type: Number, min: 0, max: 1, required: true, default: 0 },
  contempt: { type: Number, min: 0, max: 1, required: true, default: 0 },
  disgust: { type: Number, min: 0, max: 1, required: true, default: 0 },
  fear: { type: Number, min: 0, max: 1, required: true, default: 0 },
  happiness: { type: Number, min: 0, max: 1, required: true, default: 0 },
  neutral: { type: Number, min: 0, max: 1, required: true, default: 0 },
  sadness: { type: Number, min: 0, max: 1, required: true, default: 0 },
  surprise: { type: Number, min: 0, max: 1, required: true, default: 0 }
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

