var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
var userRoutes = require('./routes/User');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  app.use('/api/users', userRoutes);

  app.get('*', function(req, res) {
    res.send('Hi');
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
