const fs = require('fs');

const winston = require('winston');
const WinstonDailyRotate = require('winston-daily-rotate-file');

const { logDir, logLevel } = require('./config');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: logLevel,
      handleExceptions: true,
      humanReadableUnhandledException: true
    }),
    new (WinstonDailyRotate)({
      filename: `${logDir}/%DATE%.log`,
      timestamp: tsFormat,
      datePattern: 'YYYY-MM-DD',
      prepend: true,
      level: logLevel,
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ]
});

module.exports = logger;
