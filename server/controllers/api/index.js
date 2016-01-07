var express = require('express'),
    auth = require('./auth.controller'),
    profile = require('./profile.controller')

var apiRouter = express.Router();

apiRouter.post('/signin', auth.authenticate);

/* User routes */
apiRouter.put('/auth/user/update', profile.updateProfile)
