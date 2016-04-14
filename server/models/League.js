const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
  name: String,
  players: [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedDate: { type: Date, default: Date.now },
    isAdmin: Boolean
  }],
  sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport' },
  teamSize: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('League', leagueSchema);
