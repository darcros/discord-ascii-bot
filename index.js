const Discord = require('discord.js');

const client = new Discord.Client();
client.config = require('./config');
client.logger = require('./logger.js');

// post bot stats on DBL
require('./functions/dbl')(client);

client.logger.info('Bot starting...');

client.commands = new Discord.Collection();

// set commands
client.logger.verbose('loading commands...');

client.commands.set('help', require('./commands/help'));
client.commands.set('ping', require('./commands/ping'));
client.commands.set('info', require('./commands/info'));
client.commands.set('image', require('./commands/image'));
client.commands.set('text', require('./commands/text'));
client.commands.set('fonts', require('./commands/fonts'));

// import event handlers
const onReady = require('./events/ready.js');
const onMessage = require('./events/message.js');

// set event handlers
client.on('ready', () => onReady(client));
client.on('message', message => onMessage(client, message));

// log events
// TODO: move event handlers in separate files
client
  .on('debug', info => client.logger.debug(info))
  .on('warn', warning => client.logger.warning(warning))
  .on('error', err => client.logger.error('Discord client error', err))
  .on('disconnect', () => client.logger.warn('Bot disconnected!'))
  .on('reconnecting', () => client.logger.warn('Reconnecting...'));

// start the bot
client.login(client.config.token);
client.logger.verbose('Logging in...');
