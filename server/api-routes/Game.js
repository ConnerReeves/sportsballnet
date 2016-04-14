const router = require('express').Router();
const Game = require('../models/Game');

router.route('/')
  .post((req, res) => {
    const game = new Game(req.body);
    game.save((err, game) => res.send(err || game));
  });

module.exports = router;
