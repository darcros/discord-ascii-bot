const minimist = require('minimist');
const figlet = require('figlet');

const fontName = require('../functions/text/fontName');

// preload the font list
const list = figlet.fontsSync().map(fontName.out);

const parser = argString => minimist(argString, {
  alias: {
    search: ['s', 'string', 'searchString', 'stringSearch']
  }
});

module.exports = (client, message, argString) => {
  const args = parser(argString);

  if (message.channel.type !== 'dm') message.reply('sending the list in your DMs.');

  // prepare the message to send
  let msg = list;
  if (args.search) {
    msg = msg.filter(elem => elem.toLowerCase().includes(args.search.toLowerCase()));
  }
  msg = msg.reduce((prev, next) => `${prev}, ${next}`);

  // send with split enabled
  message.author.send(msg, {
    split: {
      char: ', ',
    }
  });
};
