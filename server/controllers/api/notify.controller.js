var User = require('../../models').User,
    Notification = require('../../models').Notification;

function sendNotification (req, res) {
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
          sender: {
            id: sender.id._id,
            username: target.username
          },
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

function getNotifications(req, res) {
  var authUser = req.decoded.user;

  User.findOne({ username: authUser }, function(err, user) {
    if (err) console.error(err);

    if (!user) {
      res.json({ success: false, reason: 'User does not exist' });
    } else {

      Notification.find({ _id: { $in: user.notifications.incoming }}, function(err, notifications) {

          var respNotifications = notifications.map(function(notification) {

            if (!notification.isResolved) {
              return {
                sender: {
                  username: notification.sender.username
                },
                isRead: notification.isRead,
                createdAt: notification.createdAt
              };
            }
          });
          res.json(respNotifications);
      });
    }
  });
}

module.exports = {
  sendNotification: sendNotification,
  getNotifications: getNotifications
};