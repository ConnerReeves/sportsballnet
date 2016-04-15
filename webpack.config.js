var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: ['./client/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'style!css!sass?sourceMap'
    },{
      test: /\.css$/,
      loader: 'style!css'
    },{
      test: /\.png/,
      loader: 'url?limit=10000&minetype=image/png'
    }]
  },
};
