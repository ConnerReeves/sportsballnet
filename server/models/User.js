const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  name: String,
  password: { type: String, select: false },
  createdDate: { type: Date, default: Date.now },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pending: Boolean,
  currentLeague: { type: mongoose.Schema.Types.ObjectId, ref: 'League' }
});

module.exports = mongoose.model('User', userSchema);
