const router = require('express').Router();
const League = require('../models/League');
const User = require('../models/User');

router.route('/')
  .post((req, res) => {
    const league = new League(req.body);
    const userId = req.session.passport.user;

    User.findById(userId, (err, user) => {
      league.players.push({
        player: user._id,
        isAdmin: true
      });

      league.save((err, league) => {
        League.populate(league, ['sport', 'players.player'], (err, league) => res.send(err || league));
      });
    });
  })

  .get((req, res) => {
    League.find()
      .populate(['players', 'sport'])
      .exec((err, league) => res.send(err || league));
  });

router.route('/:leagueId')
  .get((req, res) => {
    League.findById(req.params.leagueId)
      .populate(['players', 'sport'])
      .exec((err, league) => res.send(err || league));
  })

  .put((req, res) => {
    League.findById(req.params.leagueId, (err, league) => {
      if (err) res.send(err);
      Object.assign(league, req.body);
      league.save((err) => res.send(err || league));
    });
  });

module.exports = router;
