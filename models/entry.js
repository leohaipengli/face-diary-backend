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
  content: { typr: String, max: 1000 },
  // path of photo
  face_photo: { type: String,  max: 200, required: true},
  // TODO: emotions
  },
  {
    // update date field (createdAt, updatedAt) of document before saved
    timestampes: true
  }  );

// entrySchema.pre('save', setTimestamps);
var Entry = mongoose.model('Book', entrySchema);
//Export function to create "SomeModel" model class
module.exports = Entry;
