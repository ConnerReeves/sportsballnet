const gameRoutes = require('./Game');
const leagueRoutes = require('./League');
const organizationRoutes = require('./Organization');
const sportRoutes = require('./Sport');
const userRoutes = require('./User');

module.exports = (app) => {
  app.use('/api/*', function(req, res, next) {
    if (process.env.DEV || (req.isAuthenticated && req.isAuthenticated())) {
      return next();
    }

    return res.sendStatus(401);
  });

  app.use('/api/games', gameRoutes);
  app.use('/api/leagues', leagueRoutes);
  app.use('/api/organizations', organizationRoutes);
  app.use('/api/sports', sportRoutes);
  app.use('/api/users', userRoutes);
};
