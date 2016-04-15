const router = require('express').Router();
const League = require('../models/League');
const User = require('../models/User');
const Game = require('../models/Game');
const getPlayerDetails = require('../utils/LeagueUtils').getPlayerDetails;
const sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);

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
      .populate(['players.player', 'sport'])
      .exec((err, league) => {
        Game.find({ league: league._id }, (err, games) => {
          const playerDetails = getPlayerDetails(games, league.players.map(member => member.player._id));

          const leaguePlayers = league.players.map((member, index) => {
            const player = Object.assign({}, member.player.toObject(), playerDetails[member.player._id]);
            return Object.assign({}, member.toObject(), { player });
          });

          res.send(err || Object.assign({}, league.toObject(), { players: leaguePlayers }));
        });
      });
  })

  .put((req, res) => {
    League.findById(req.params.leagueId, (err, league) => {
      if (err) {
        res.send(err);
      }

      Object.assign(league, req.body);
      league.save((err) => res.send(err || league));
    });
  });

router.route('/:leagueId/players')
  .post((req, res) => {
    const userId = req.session.passport.user;

    League.findById(req.params.leagueId, (err, league) => {
      if (err) {
        res.send(err);
      }

      const playerIsInLeague = league.players.some((player) =>
        player.player.toString() === userId
      );

      if (playerIsInLeague) {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (err) {
            res.send(err);
          }

          if (!user) {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              currentLeague: req.body.currentLeague,
              invitedBy: userId,
              pending: true
            });

            newUser.save((err, createdUser) => {
              if (err) {
                res.send(err);
              }

              league.players.push({
                player: createdUser._id,
                isAdmin: false
              });

              league.save((err, updatedLeague) => {
                League.populate(updatedLeague, 'players.player', (err, populatedLeague) => {
                  const urlBase = process.env.DEV ? `http://localhost:${process.env.PORT}` : 'http://sportsballnet.herokuapp.com';

                  sendgrid.send({
                    to: createdUser.email,
                    from: 'invites@sportsballnet.herokuapp.com',
                    subject: `Welcome to ${league.name} on SportsBallNet`,
                    html: `Click <a href="${urlBase}/register/${createdUser._id}">here</a> to finish registration`
                  }, (err, json) => {
                    res.send(populatedLeague.players[populatedLeague.players.length - 1]);
                  });
                });
              });
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    });
  })

  .get((req, res) => {
    const playerIds = Array.isArray(req.query.playerIds) ? req.query.playerIds : [req.query.playerIds];

    Game.find({ league: req.params.leagueId }, (err, games) => {
      const playerDetails = getPlayerDetails(games, playerIds);
      res.send(playerDetails);
    });
  });

module.exports = router;
