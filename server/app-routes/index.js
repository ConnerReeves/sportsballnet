const passport = require('passport');
const User = require('../models/User');

module.exports = (app) => {
  app.get('/app/user', (req, res) => {
    const userId = req.session.passport.user;
    User.findById(userId, (err, user) => {
      res.send(user);
    });
  });
};
