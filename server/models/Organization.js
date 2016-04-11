const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  name: String,
  players: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Organization', organizationSchema);
