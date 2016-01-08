var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var notificationSchema = mongoose.Schema({
  sender: { type: ObjectId, ref: 'User' },
  recipient: { type: ObjectId, ref: 'User' },
  read: { type: Boolean, default: false },
  resolved: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
});

notificationSchema.pre('save', function(next) {
  var now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

notificationSchema.methods.resolve = function() {
  this.resolved = true;
};

notificationSchema.methods.read = function() {
  this.read = true;
};

var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
