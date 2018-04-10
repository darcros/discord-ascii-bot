const figlet = require('figlet');

const fontName = require('../functions/text/fontName');

// preload the font list
const list = figlet.fontsSync().map(fontName.out);

module.exports = (client, message) => {
  if (message.channel.type !== 'dm') message.reply('sending the list in your DMs.');

  // prepare the message to send
  const msg = list
    .reduce((prev, next) => `${prev}, ${next}`);

  // send with split enabled
  message.author.send(msg, {
    split: {
      char: ', ',
    }
  });
};
