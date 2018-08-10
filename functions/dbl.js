const DBL = require('dblapi.js');

// post server count to Discord Bot List (DBL)
module.exports = (client) => {
  if (process.env.NODE_ENV !== 'production' || !client.config.dblToken) return;

  client.logger.info('DBL stats are enabled');
  const dbl = new DBL(client.config.dblToken, client);
  dbl.on('error', err => client.logger.error('DBL error', err));
};
