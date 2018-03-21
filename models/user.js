var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  email: { type: String, max: 100, required: true, unique: true},
  // password: { type: String, min: 6, max: 20,  required: true},
  name: { type: String, max: 30 },
  diary: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

var User = mongoose.model('User', userSchema);
module.exports = User;
