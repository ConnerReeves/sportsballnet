const mongoose = require('mongoose');

const sportSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Sport', sportSchema);
