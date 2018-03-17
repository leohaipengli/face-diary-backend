var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: { type: String, max: 30 },
  diary: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
});

var User = mongoose.model('User', userSchema);
module.exports = User;
