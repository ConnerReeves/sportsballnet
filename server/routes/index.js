const organizationRoutes = require('./Organization');
const userRoutes = require('./User');

module.exports = (app) => {
  app.use('/api/organizations', organizationRoutes);
  app.use('/api/users', userRoutes);
};
