var express = require('express'),
    auth = require('./auth.controller.js');

var apiRouter = express.Router();

apiRouter.post('/signin', auth.authenticate);

/* User routes */
apiRouter.put('/auth/user/update')
