const minimist = require('minimist');
const Joi = require('joi');
const ms = require('ms');

const sendHelp = require('../functions/sendHelp');

const parser = argString => minimist(argString, {
  boolean: ['help']
});

const validator = args => Joi.validate(args, {
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
    sendHelp(message, 'info', 'inlineOption');
    return;
  }

  message.channel.send(`**ASCII info**
> Uptime: ${ms(client.uptime, { long: true })}
> Servers: ${client.guilds.size}
> Bot invite: <https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=523328>
> Support server: <${client.config.supportServerInvite}>`);
};
