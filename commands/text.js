const minimist = require('minimist');
const figlet = require('figlet');

const fontName = require('../functions/text/fontName');

const parser = argString => minimist(argString, {
  alias: {
    font: 'f',
    kerning: 'k',
    // TODO: make something similar to the fonts because there are spaces
    // and wrapping the arguments in quotes is annoying
    horizontalLayout: ['horizontal', 'hLayout', 'hl', 'h'],
    verticalLayout: ['vertical', 'vLayout', 'vl', 'v']
  },
  string: ['chars'],
  default: {
    font: 'standard',
    kerning: 'default'
  }
});

// TODO: send user error message on malformed args
module.exports = (client, message, argString) => {
  const args = parser(argString);

  const font = fontName.in(args.font);
  const { kerning, horizontalLayout, verticalLayout } = args;

  figlet(args._, {
    font,
    kerning,
    horizontalLayout,
    verticalLayout
  }, (err, text) => {
    if (err) {
      message.reply('An unknown error occurred');
      client.log('error', err);
      return;
    }
    message.channel.send(text, { code: true });
  });
};
