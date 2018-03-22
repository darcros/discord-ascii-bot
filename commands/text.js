const figlet = require('figlet');
const log = require('../functions/log');

module.exports = (client, message, args) => {
  figlet(args.join(' '), (err, text) => {
    if (err) log('error', err);
    message.channel.send(text, { code: true });
  });
};
