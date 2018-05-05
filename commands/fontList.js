const minimist = require('minimist');
const Joi = require('joi');
const figlet = require('figlet');

const fontName = require('../functions/text/fontName');

// preload the font list
const list = figlet.fontsSync().map(fontName.out);

const parser = argString => minimist(argString, {
  alias: {
    search: ['s', 'string', 'searchString', 'stringSearch']
  }
});

const validator = args => Joi.validate(args, {
  search: Joi.string()
}, {
  allowUnknown: true // ignore aliases and args._
});

module.exports = (client, message, argString) => {
  const args = parser(argString);
  const { error } = validator(args);
  if (error) {
    message.reply(error.details[0].message);
    return;
  }

  if (message.channel.type !== 'dm') message.reply('Sending the list in your DMs.');

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
