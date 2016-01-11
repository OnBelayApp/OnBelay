var jwt = require('jsonwebtoken');

if (process.env.NODE_ENV === undefined) {
  credentials = require('../../config/secrets');
} else {
  credentials.authentication.tokenSecret = process.env.TOKEN_SECRET;
}

module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'];

   if (!token) {
     return res.status(403).json({ success: false, reason: 'Invalid token' });
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
