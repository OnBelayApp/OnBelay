var express = require('express'),
    auth = require('./auth.controller'),
    profile = require('./profile.controller'),
    token = require('../../middleware/'),
    user = require('./user.controller.js')
    flag = require('./flag.controller.js'),
    notify = require('./notify.controller.js');


var apiRouter = express.Router();

apiRouter.post('/signin', auth.signIn);
apiRouter.post('/signup', auth.signUp);

/* Token middleware */
apiRouter.use('/auth', token.authenticate);

/* Auth routes */
apiRouter.put('/auth/user/update', profile.updateProfile);
apiRouter.get('/auth/user/climbers', user.findActiveClimbers);
apiRouter.all('/auth/user/flag', flag.climbFlag);
apiRouter.post('/auth/user/notifications/create', notify.sendNotification);

module.exports = apiRouter;
