var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// function setTimestamps(next) {
//   // update date field of document before saved
//   var now = new Date();
//   this.updatedAt = now;
//   if ( !this.createdAt ) {
//     this.createdAt = now;
//   }
//   next();
// }

var entrySchema = new Schema({
  // author, bond to user
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  // text part of diary: keywords
  keywords: [{ type: String, max: 40 }],
  // createAt
  // updatedAt
  content: { type: String, max: 1000 },
  // path of photo
  facePhoto: { type: String,  max: 200, required: true},
  // get from azure api
  emotions: {
    anger: { type: Number, min: 0, max: 1 },
    contempt: { type: Number, min: 0, max: 1 },
    disgust: { type: Number, min: 0, max: 1 },
    fear: { type: Number, min: 0, max: 1 },
    happiness: { type: Number, min: 0, max: 1 },
    neutral: { type: Number, min: 0, max: 1 },
    sadness: { type: Number, min: 0, max: 1 },
    surprise: { type: Number, min: 0, max: 1 }
  }},
  {
    // update date field (createdAt, updatedAt) of document before saved
    timestamps: true
  });

// entrySchema.pre('save', setTimestamps);
var Entry = mongoose.model('Book', entrySchema);
//Export function to create "SomeModel" model class
module.exports = Entry;
