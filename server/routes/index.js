const organizationRoutes = require('./Organization');
const userRoutes = require('./User');

module.exports = (app) => {
  app.use('/api/organizations', organizationRoutes);
  app.use('/api/users', userRoutes);

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    res.send(err);
  });
};
