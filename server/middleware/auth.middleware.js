var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'];

   if (!token) {
     return res.send(403);
   }
   // TODO: add decoded token to req
   jwt.verify(token, credentials.authentication.tokenSecret, function(err, decoded) {
     if (err) {
       console.log(err);
       return res.send(403);
     }
     req.decoded = decoded;
     next();
   });

};
