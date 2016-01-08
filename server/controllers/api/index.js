var express = require('express'),
    auth = require('./auth.controller'),
    profile = require('./profile.controller'),
    token = require('../middleware/');


var apiRouter = express.Router();

apiRouter.post('/signin', auth.authenticate);
apiRouter.post('/signup', authenticateToken);

/* User routes */
apiRouter.use('/auth', token.authenticate);
apiRouter.put('/auth/user/update', profile.updateProfile);
