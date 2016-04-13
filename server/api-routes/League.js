const router = require('express').Router();
const League = require('../models/League');
const User = require('../models/User');
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
      .exec((err, league) => res.send(err || league));
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
                const urlBase = process.env.DEV ? `http://localhost:${process.env.PORT}` : 'http://http://sportsballnet.herokuapp.com';

                sendgrid.send({
                  to: createdUser.email,
                  from: 'invites@sportsballnet.herokuapp.com',
                  subject: `Welcome to ${league.name} on Sportsballnet`,
                  html: `Click <a href="${urlBase}/register/${createdUser._id}">here</a> to finish registration`
                }, (err, json) => {
                  res.sendStatus(200);
                });
              });
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    });

  });

module.exports = router;
