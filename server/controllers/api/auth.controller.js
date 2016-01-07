var User = require('../models'),
    jwt = require('jsonwebtoken');

var createToken = function(user) {
 return jwt.sign({ user: user.username }, credentials.authentication.tokenSecret, {
   expiresIn: 86400
 });
};

module.exports = {
  authenticate: function(req, res) {
    // look for user in database
    User.findOne({'username': req.body.username}, function(err, person) {
      if (person) {
        User.comparePassword(req.body.password, person.password, function(valid) {
          if (valid) {
            var userToken = createToken(person);
            res.json({'success': true, 'token': userToken});
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
};
