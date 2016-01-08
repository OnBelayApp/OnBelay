var apiRoutes = require('./api');

exports.climbOn = function(app) {
  app.use('/api', apiRoutes);
};