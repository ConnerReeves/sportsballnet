const router = require('express').Router();
const Organization = require('../models/Organization');

router.route('/')
  .post((req, res) => {
    const organization = new Organization(req.body);

    organization.save((err, organization) => res.send(err || organization));
  })

  .get((req, res) => {
    Organization.find((err, users) => res.json(err || users))
  });

router.route('/:orgId')
  .get((req, res) => {
    Organization.findById(req.params.orgId)
      .populate('players')
      .exec((err, organization) => res.send(err || organization));
  })

  .put((req, res) => {
    Organization.findById(req.params.orgId, (err, organization) => {
      if (err) res.send(err);
      Object.assign(organization, req.body);
      organization.save((err) => res.send(err || organization));
    });
  });

module.exports = router;
