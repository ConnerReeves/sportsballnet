const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  league: { type: mongoose.Schema.Types.ObjectId, ref: 'League' },
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  losers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  playedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
