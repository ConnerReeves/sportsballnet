const router = require('express').Router();
const Sport = require('../models/Sport');

router.route('/')
  .post((req, res) => {
    const sport = new Sport(req.body);
    sport.save((err, sport) => res.send(err || sport));
  })

  .get((req, res) => {
    Sport.find((err, sports) => res.json(err || sports));
  });

router.route('/:sportId')
  .get((req, res) => {
    Sport.findById(req.params.sportId, (err, sport) => res.send(err || sport));
  })

  .put((req, res) => {
    Sport.findById(req.params.sportId, (err, sport) => {
      if (err) res.send(err);
      Object.assign(sport, req.body);
      sport.save((err) => res.send(err || sport));
    });
  });

module.exports = router;
