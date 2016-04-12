const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (app) => {
  passport.use(new Strategy((username, password, next) => {
    User.findOne({ email: username }, (err, user) => {
      return next(err || null, user && user.password === password ? user : false);
    });
  }));

  passport.serializeUser((user, next) => next(null, user._id));

  passport.deserializeUser((id, next) => {
    User.findById(id, (err, user) => {
      return next(err || null, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/login',
           passport.authenticate('local', { failureRedirect: '/login' }),
           (req, res) => res.redirect('/'));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
