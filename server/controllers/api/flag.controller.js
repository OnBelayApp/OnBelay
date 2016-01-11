var User = require('../../models').User;

exports.climbFlag = function(req, res) {
  var authUser = req.decoded.user;
  //find User
  User.findOne({ username: authUser }, function(err, user) {
    if (err) console.error(err);

    if (!user) {
      res.json({ success: false, reason: 'User not found' });
    } else {

      switch (req.method) {

        case 'PUT' :
          user.climb = !user.climb;

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
