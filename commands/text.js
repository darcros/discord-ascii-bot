const minimist = require('minimist');
const Joi = require('joi');
const figlet = require('figlet');

const sendHelp = require('../functions/sendHelp');
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
  default: {
    font: 'standard',
    kerning: 'default'
  },
  boolean: ['help']
});

const validator = args => Joi.validate(args, {
  font: Joi.string(),
  kerning: Joi.string().valid('default', 'fitted', 'full'), // NOTE: empty strings are disallowed by default
  horizontalLayout: Joi.string().valid('default', 'full', 'fitted', 'controlled smushing', 'universal smushing'),
  verticalLayout: Joi.string().valid('default', 'full', 'fitted', 'controlled smushing', 'universal smushing'),
  chars: Joi.string(),
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
    sendHelp(message, 'text', 'inlineOption');
    return;
  }

  const font = fontName.in(args.font);
  const { kerning, horizontalLayout, verticalLayout } = args;

  figlet(args._, {
    font,
    kerning,
    horizontalLayout,
    verticalLayout
  }, (err, text) => {
    if (err) {
      if (err.code === 'ENOENT') {
        message.reply(`the font "${font}" does not exist.\nUse the "fonts" command to get a list of available fonts.`);
      } else {
        message.reply('an unknown error occurred');
        client.logger.error('Could not render figlet text', err);
      }
      return;
    }
    // FIXME: if somehow the message is bigger than 2000 chars this throws an error
    message.channel.send(text, { code: true });
  });
};
