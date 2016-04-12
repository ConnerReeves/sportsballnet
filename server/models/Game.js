const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  winner: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Game', gameSchema);
