const figlet = require('figlet');

const fontName = require('../functions/text/fontName');
const log = require('../functions/log');

// TODO: pass custom kerning
module.exports = (client, message, args) => {
  const font = fontName.in(args.f || 'standard');
  figlet(args._, { font }, (err, text) => {
    if (err) log('error', err);
    message.channel.send(text, { code: true });
  });
};
