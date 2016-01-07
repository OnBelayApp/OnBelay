var User = require('../models');

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
  }
};
