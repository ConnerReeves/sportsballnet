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
  app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
  require('./routes')(app);

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}
