var User = require('../../models').User,
    Notification = require('../../models').Notification;

exports.sendNotification = function(req, res) {
  var authUser = req.decoded.user;
  var targetUser = req.body.targetUser;
  var newNotification;

  User.findOne({ username: authUser }, function(err, sender) {
    if (err) console.error(err);

    if (!sender) {
      res.json({ success: false, reason: 'User not found' });
    } else {
      User.findOne({ username: targetUser }, function(err, target) {

        newNotification = new Notification({
          sender: sender._id,
          recipient: target._id
        });

        newNotification.save(function(err, notification) {
          if (err) console.error(err);

          sender.notifications.outgoing.push(notification._id);
          target.notifications.incoming.push(notification._id);

          sender.save(function(err) {
            if (err) console.error(err);
          });
          target.save(function(err) {
            if (err) console.error(err);
          });
          res.json({ success: true });
        });
      });
    }
  });
};