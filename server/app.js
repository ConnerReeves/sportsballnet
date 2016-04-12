module.exports = function(port) {
  const cookieSession = require('cookie-session');
  const express = require('express');
  const bodyParser = require('body-parser');
  const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

  const app = express();

  // Middlewares
  app.use(express.static('dist'));
  app.use(bodyParser.json());
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

  // Routes
  require('./api-routes')(app);
  require('./auth-routes')(app);

  app.get(['/login', '/newuser'], (req, res) => res.sendFile(__dirname + '/views/index.html'));
  app.get('*', ensureLoggedIn(), (req, res) => res.sendFile(__dirname + '/views/index.html'));

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}
