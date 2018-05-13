const minimist = require('minimist');
const Joi = require('joi');

const sendHelp = require('../functions/sendHelp');

const parser = argString => minimist(argString, {
  boolean: ['help']
});

const validator = args => Joi.validate(args, {
  help: Joi.boolean()
}, {
  allowUnknown: true // ignore aliases and args._
});

const { docsUrl } = require('../config');

const sendDefaultHelp = message => message.reply(`you can find help about all the commands here: ${docsUrl}.\nYou can also try \`help <commandName>\` to get a link to a specific command.`);

module.exports = (client, message, argString) => {
  const args = parser(argString);
  const { error } = validator(args);
  if (error) {
    message.reply(error.details[0].message);
    return;
  }
  if (args.help || argString.length === 0) {
    sendDefaultHelp(message);
    return;
  }

  const command = argString[0].trim().toLowerCase();
  if (client.commands.has(command)) {
    sendHelp(message, command, 'helpCommand');
  } else {
    message.reply('command not found');
  }
};
