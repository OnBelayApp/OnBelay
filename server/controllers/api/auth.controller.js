var User = require('../../models').User,
    jwt = require('jsonwebtoken'),
    credentials = require('../../config/secrets');

var createToken = function(user) {
 return jwt.sign({ user: user.username }, credentials.authentication.tokenSecret, {
   expiresIn: 86400
 });
};

module.exports = {
  signIn: function(req, res) {
    // look for user in database
    User.findOne({'username': req.body.username}, function(err, user) {
      if (user) {
        user.comparePassword(req.body.password, user.password, function(valid) {
          if (valid) {
            var userToken = createToken(user);
            res.json({'success': true, 'token': userToken, 'status': user.climb});
          } else {
            res.json({'success': false, 'reason': 'Password incorrect'});
          }
        });
      } else {
        res.json({'success': false, 'reason': 'Username does not exist'});
      }
    });
  },
  signUp: function(req, res) {

    User.findOne({ username: req.body.username }, function(err, user) {
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
          });
        });
      }
    });
  }
};
