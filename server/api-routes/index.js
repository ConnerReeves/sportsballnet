const leagueRoutes = require('./League');
const organizationRoutes = require('./Organization');
const sportRoutes = require('./Sport');
const userRoutes = require('./User');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = (app) => {
  app.use('/api/*', function(req, res, next) {
    if (process.env.DEV || (req.isAuthenticated && req.isAuthenticated())) {
      return next();
    }

    return res.sendStatus(401);
  });

  app.use('/api/leagues', leagueRoutes);
  app.use('/api/organizations', organizationRoutes);
  app.use('/api/sports', sportRoutes);
  app.use('/api/users', userRoutes);
};
