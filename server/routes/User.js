const router = require('express').Router();
const User = require('../models/User');

router.route('/')
  .post((req, res) => {
    const user = new User(req.body);
    user.save((err, user) => res.send(err || user));
  })

  .get((req, res) => {
    User.find((err, users) => res.json(err || users));
  });

router.route('/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, user) => res.send(err || user));
  })

  .put((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) res.send(err);
      Object.assign(user, req.body);
      user.save((err) => res.send(err || user));
    });
  });

module.exports = router;
