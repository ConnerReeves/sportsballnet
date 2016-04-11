module.exports = function(port) {
  const cookieSession = require('cookie-session');
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();

  // Middlewares
  app.use(express.static('dist'));
  app.use(cookieSession({ secret: 'sportsballz' }));
  app.use(bodyParser.json());

  // Routes
  require('./routes')(app);
  app.get('*', (req, res) => res.sendFile(__dirname + '/views/index.html'));

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}
