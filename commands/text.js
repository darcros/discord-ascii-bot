const figlet = require('figlet');

const fontName = require('../functions/text/fontName');
const log = require('../functions/log');

module.exports = (client, message, string, args) => {
  const font = fontName.in(args['-f'] || 'standard');
  figlet(string, { font }, (err, text) => {
    if (err) log('error', err);
    message.channel.send(text, { code: true });
  });
};
