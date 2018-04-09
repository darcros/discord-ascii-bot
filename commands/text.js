const figlet = require('figlet');

const fontName = require('../functions/text/fontName');
const log = require('../functions/log');

// TODO: send user error message on malformed args
module.exports = (client, message, args) => {
  const font = fontName.in(args.f || args.font);
  const kerning = args.k || args.kerning;

  figlet(args._, { font, kerning }, (err, text) => {
    if (err) log('error', err);
    message.channel.send(text, { code: true });
  });
};
