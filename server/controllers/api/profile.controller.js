var User = require('../../models').User;

function updateProfile(req, res) {

  //find User
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) console.error(err);

    if (!user) {
      res.json({ success: false, reason: 'User not found' });
    } else {

      user.name.first = req.body.name.first;
      user.name.last = req.body.name.last;
      user.zipCode = req.body.zipCode;
      user.skillLevel = req.body.skillLevel;

      user.save(function(err, user) {
        if (err) console.error(err);
        res.json({ success: true });
      });
    }
  });
}

module.exports = updateProfile;