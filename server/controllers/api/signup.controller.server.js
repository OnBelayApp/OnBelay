var mongoose = require('mongoose'),
    User = require('../../models/user.model.js'),
    jwt = require('jsonwebtoken');

var createToken = function(user) {
  return jwt.sign({ user: user.username }, credentials.authentication.tokenSecret, {
    expiresIn: 86400
  });
};

module.exports = {

  signUp: function(req, res) {

    User.findOne({ req.body.username }, function(err, user) {
      if (err) console.error(err);

      if (user) {
        res.json({
          success: false,
          reason: 'User with that username already exists'
        });
      } else {
        var newUser = new User({
          username: req.body.username,
          password: null
        });

        newUser.hashPassword(req.body.password, function(hash) {
          newUser.password = hash;
          newUser.save(function(err, user) {
            if (err) console.error(err);

            var token = createToken(user);
            res.json({ success: true, token: token });
          })
        })
      }
    });
  }
}