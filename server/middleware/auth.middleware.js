var jwt = require('jsonwebtoken'),
    credentials = require('../config/secrets');

module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'];

   if (!token) {
     return res.send(403);
   }

  jwt.verify(token, credentials.authentication.tokenSecret, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(403).json({ success: false, reason: 'Invalid token' });
    }
    req.decoded = decoded;
    next();
  });
};
