var express = require('express'),
    auth = require('./auth.controller.js');

var apiRouter = express.Router();

apiRouter.post('/signin', auth.authenticate);
