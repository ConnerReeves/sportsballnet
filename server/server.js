var webpack = require('webpack');
var config = require('../webpack.config');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json())

mongoose.connect(process.env.MONGOLAB_URI);
var db = mongoose.connection;
var organizationRoutes = require('./routes/Organization');
var userRoutes = require('./routes/User');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  app.use('/api/organizations', organizationRoutes);
  app.use('/api/users', userRoutes);

  app.get('*', function(req, res) {
    res.send('Hi');
  });

  app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
