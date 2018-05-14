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

const headerTemplate = (search) => {
  if (!search) {
    return '=========\n*FONT LIST*\n=========\n';
  }

  const text = `*RESULTS FOR: "${search}"*\n`;
  const line = '='.repeat(text.length - 2).concat('\n');
  return line + text + line;
};

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

  const timer = client.logger.startTimer();

  if (message.channel.type !== 'dm') message.reply('sending the list in your DMs.');

  // prepare the message to send
  let results = list;
  if (args.search) {
    results = results.filter(elem => elem.toLowerCase().includes(args.search.toLowerCase()));
  }
  if (results.length === 0) {
    message.reply('no results');
    return;
  }

  timer.done('fonts command', {
    query: args.search,
    results: results.length
  });

  const msg = results.reduce((prev, next) => `${prev}, ${next}`);
  // send with split enabled
  message.author.send(headerTemplate(args.search) + msg, {
    split: {
      char: ', ',
    }
  });
};
