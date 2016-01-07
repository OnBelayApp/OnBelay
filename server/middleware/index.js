var bodyParser = require('body-parser'),
    morgan = require('morgan');

var app = require('../server.js');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/../../client'));
