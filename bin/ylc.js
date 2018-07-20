#!/usr/bin/env node

const http = require('http');
const app = require('../app');
const logger = require('../helper/logger');

const { connectDB } = require('../dao/db/conn');
const config = require('../config/config.default');

(async () => {

  try {
    await connectDB();
    logger.info('Database connection success')

    let port = normalizePort(config.PORT);
    app.set('port', port);

    let server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort(val) {
      let port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          logger.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
      logger.info('Listening on ' + bind);
    }

  } catch (error) {
    let i = 5;
    logger.error(error.stack);
    let timmer = setInterval(() => {
      if (i === 0) {
        clearInterval(timmer);
        logger.error('System shut down');
        process.exit(1)
      } else {
        logger.error(`System will shut down in ${i} s....`);
        i--;
      }
    }, 1000)
  }
})();
