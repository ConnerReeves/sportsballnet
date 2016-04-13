const passport = require('passport');
const League = require('../models/League');
const User = require('../models/User');

module.exports = (app) => {
  app.get('/app/user', (req, res) => {
    const userId = req.session.passport.user;
    User.findById(userId, (err, user) => {
      League.find({ ['players.player']: userId })
      .populate('players.player')
      .exec((err, leagues) => {
        const hydratedLeaguesUser = Object.assign({}, user.toObject(), { leagues });
        res.send(hydratedLeaguesUser);
      });
    });
  });
};
