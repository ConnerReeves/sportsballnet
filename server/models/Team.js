const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Team', teamSchema);
