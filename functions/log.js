/* eslint no-console:0 */

const timestamp = require('time-stamp');

module.exports = (level, message) => {
  const time = timestamp('[HH:mm:ss]');

  switch (level) {
    case 'info':
      console.info(time, '[INFO]', message);
      break;
    case 'warn':
      console.warn(time, '[WARN]', message);
      break;
    case 'error':
      console.error(time, '[ERROR]', message);
      break;
    default:
      console.log(time, '[LOG]', message);
      break;
  }
};
