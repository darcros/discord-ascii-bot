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

module.exports = (client, message, argString) => {
  const args = parser(argString);
  const { error } = validator(args);
  if (error) {
    message.reply(error.details[0].message);
    return;
  }
  if (args.help) {
    sendHelp(message, 'ping', 'inlineOption');
    return;
  }

  message.channel.send('Pong...').then((msg) => {
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  });
};
