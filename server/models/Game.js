const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  winner: mongoose.Schema.Types.ObjectId,
  playedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
