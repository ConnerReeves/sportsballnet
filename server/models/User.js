const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  name: String,
  password: String,
  createdDate: { type: Date, default: Date.now },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('User', userSchema);
