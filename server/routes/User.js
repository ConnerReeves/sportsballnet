var express = require('express');
var User = require('../models/User');
var router = express.Router();

router.route('/')
  .get((req, res) => {
    User.find((err, users) => {
      res.json(users);
    });
  });

module.exports = router;
