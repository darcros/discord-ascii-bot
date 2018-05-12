const minimist = require('minimist');
const Joi = require('joi');
const figlet = require('figlet');

const sendHelp = require('../functions/sendHelp');
const fontName = require('../functions/text/fontName');

// preload the font list
const list = figlet.fontsSync().map(fontName.out);

const parser = argString => minimist(argString, {
  alias: {
    search: ['s', 'string', 'searchString', 'stringSearch']
  },
  boolean: ['help']
});

const validator = args => Joi.validate(args, {
  search: Joi.string(),
  help: Joi.boolean()
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
  if (args.help) {
    sendHelp(message, 'fontList', 'inlineOption');
    return;
  }

  if (message.channel.type !== 'dm') message.reply('Sending the list in your DMs.');

  // prepare the message to send
  let results = list;
  if (args.search) {
    results = results.filter(elem => elem.toLowerCase().includes(args.search.toLowerCase()));
  }
  if (results.length === 0) {
    message.reply('No results');
    return;
  }

  const msg = results.reduce((prev, next) => `${prev}, ${next}`);
  // send with split enabled
  message.author.send(msg, {
    split: {
      char: ', ',
    }
  });
};
