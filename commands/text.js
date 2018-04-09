const minimist = require('minimist');
const figlet = require('figlet');

const fontName = require('../functions/text/fontName');

const parser = argString => minimist(argString, {
  alias: {
    font: 'f',
    kerning: 'k'
  },
  string: ['chars'],
  default: {
    font: 'standard',
    kerning: 'default'
  }
});

// TODO: send user error message on malformed args
// TODO: consider adding other figlet options
module.exports = (client, message, argString) => {
  const args = parser(argString);

  const font = fontName.in(args.font);
  const { kerning } = args;

  figlet(args._, { font, kerning }, (err, text) => {
    // TODO: inform user on error
    if (err) client.log('error', err);
    message.channel.send(text, { code: true });
  });
};
