const mongoose = require('mongoose');

mongoose.connect(process.env.DEV ? process.env.DEV_MONGOLAB_URI : process.env.MONGOLAB_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  const port = process.env.PORT || 3000;

  require('./app')(port, db);
});
