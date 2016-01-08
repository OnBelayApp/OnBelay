var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var notificationSchema = mongoose.Schema({
  sender: { type: ObjectId, ref: 'User' },
  recipient: { type: ObjectId, ref: 'User' },
  isRead: { type: Boolean, default: false },
  isResolved: { type: Boolean, default: false },
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

notificationSchema.methods.markResolved = function() {
  this.isResolved = true;
};

notificationSchema.methods.markRead = function() {
  this.isRead = true;
};

var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;