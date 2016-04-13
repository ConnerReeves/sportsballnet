module.exports = function(port, dbConnection) {
  const express = require('express');
  const bodyParser = require('body-parser');
  const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);

  const app = express();

  // Middlewares
  app.use(express.static('dist'));
  app.use(bodyParser.json());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'sportsballz',
    store: new MongoStore({mongooseConnection: dbConnection})
  }));

  // Routes
  require('./api-routes')(app);
  require('./app-routes')(app);
  require('./auth-routes')(app);

  app.get(['/login', '/register', '/register/:userId'], (req, res) => res.sendFile(__dirname + '/views/index.html'));
  app.get('*', ensureLoggedIn(), (req, res) => res.sendFile(__dirname + '/views/index.html'));

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}
