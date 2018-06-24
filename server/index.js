'use strict';

require('./setup/mongoose.setup');

const db = require('./setup/mongoose.setup'),
      passport = require('./setup/passport.setup'),
      app = require('./setup/express.setup'),
      log = require('debug')('jeremypridemore-me:index');

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3001;
app.set('port', Number(port));

db.on('error', console.error.bind(console, 'mongodb error:'));
db.once('open', () => {
  log('Connection to MongoDB successful.');

  // Listen on provided port, on all network interfaces.
  app.listen(port, function onListening() {
    log('Listening on ' + port);
  });
});

/**
 * Event listener for HTTP server "error" event.
 */
app.on('error', function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
