const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/User');
const path = require('path');

module.exports = (app) => {
  passport.use(new Strategy((username, password, next) => {
    User
      .findOne({ email: username })
      .select('+password')
      .exec((err, user) => {
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

  app.get('/register/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        res.send(err);
      }

      if (user && !user.pending) {
        res.redirect('/login');
      } else {
        res.sendFile(path.join(__dirname, '..', '/views/index.html'));
      }
    });
  });

  app.post('/register/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        res.send(err);
      }

      user.password = req.body.password;
      user.pending = false;

      user.save((err, updatedUser) => {
        req.login(updatedUser, (err) => {
          if (err) {
            res.send(err);
          }

          res.redirect('/');
        });
      });
    });
  });
};
