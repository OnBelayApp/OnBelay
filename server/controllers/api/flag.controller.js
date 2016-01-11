var User = require('../../models').User;

exports.climbFlag = function(req, res) {
  var updateUser = req.decoded.user;
  var climbStatus = req.body.flag;

  if (req.body.username) {
    updateUser = req.body.username;
  }
  //find User
  User.findOne({ username: updateUser }, function(err, user) {
    if (err) console.error(err);

    if (!user) {
      res.json({ success: false, reason: 'User not found' });
    } else {

      switch (req.method) {

        case 'PUT' :
          user.climb = climbStatus;

          user.save(function(err, user) {
            if (err) console.error(err);
            res.json({ success: true, status: user.climb });
          });
          break;

        case 'GET':
          res.json({ success: true, status: user.climb });
          break;
      }
    }
  });
};
