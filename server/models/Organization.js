const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  name: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Organization', organizationSchema);
