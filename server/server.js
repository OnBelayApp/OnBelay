var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    controllers = require('./controllers'),
    User = require('./models').User;

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
if (process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('dev'));
}

/* seeds the db with fake users for development */
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/onbelay');
  require('../fakeUsers')();
} else {
  mongoose.connect(process.env.MONGOLAB_URI);
}

controllers.climbOn(app);

app.listen(app.get('port'), function() {
  console.log('climb on', app.get('port'));
});
