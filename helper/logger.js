const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file')
const moment = require('moment')
const util = require('util')
const path = require('path')
const config = require('../config/config.default')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: config.YLC_NODE_ENV === 'production' ? 'info' : 'silly',
      colorize: true,
      json: false,
      prettyPrint: true,
      timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      handleExceptions: true,
    }),
    new (winston.transports.DailyRotateFile)({
      level: config.YLC_NODE_ENV === 'production' ? 'info' : 'silly',
      filename: path.join(__dirname, '../logs/.log')  ,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      colorize: false,
      timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      formatter: function (options) {
        return options.timestamp() + ' ' +
          options.level.toUpperCase() + ' ' +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      }
    })
  ]
});

logger.customStream = {
  write: function (message, encoding) {
    logger.info(message.replace('\n', ''));
  }
}

logger.debugStr = function() {
  console.log('debugStr is called')
  if (arguments.length === 1) {
    logger.debug('\n' + arguments[0].toString())
  } else if(arguments.length === 2) {
    logger.debug(arguments[0], '\n' + arguments[1].toString())
  } else {
    throw new Error('unmatch log arguments')
  }
}

module.exports = logger;