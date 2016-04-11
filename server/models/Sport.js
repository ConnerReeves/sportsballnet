const mongoose = require('mongoose');

const sportSchema = mongoose.Schema({
  image: String,
  name: String
});

module.exports = mongoose.model('Sport', sportSchema);
