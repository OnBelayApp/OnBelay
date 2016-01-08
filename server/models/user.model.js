var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  name: {
    first: String,
    last: String
  },
  zipCode: Number,
  skillLevel: String,
  gender: String,
  climb: Boolean,
  createdAt: Date,
  updatedAt: Date
});

userSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

userSchema.methods.hashPassword = function(password, callback) {
  var hash = bcrypt.hash(password, null, null, function(err, hash) {
    callback(hash);
  });
};

userSchema.methods.comparePassword = function(attempt, hash, callback) {
  bcrypt.compare(attempt, hash, function(err, res) {
    callback(res);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
