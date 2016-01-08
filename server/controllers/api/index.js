var express = require('express'),
    auth = require('./auth.controller'),
    profile = require('./profile.controller'),
    token = require('../../middleware/');


var apiRouter = express.Router();

apiRouter.post('/signin', auth.signIn);
apiRouter.post('/signup', auth.signUp);

/* Token middleware */
apiRouter.use('/auth', token.authenticate);

/* Auth routes */
apiRouter.put('/auth/user/update', profile.updateProfile);

module.exports = apiRouter;