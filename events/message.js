const stringArgv = require('string-argv');

module.exports = (client, message) => {
  if (message.author.bot) return;

  // matches messages that start with prefix OR mention
  // regExp computes to something like /^(!|<@!?123456789123456789>)/
  // FIXME: possible regExp DoS, however this stuff is controlled by the bot owner so no big deal
  const regExp = new RegExp(`^(${client.config.prefix}|<@!?${client.user.id}>)`, 'i');
  const matches = regExp.exec(message.content);

  let noPrefix = '';
  if (matches) {
    noPrefix = message.content.slice(matches[0].length);
  } else if (!matches && message.channel.type === 'dm') {
    noPrefix = message.content;
  } else return;

  const split = stringArgv(noPrefix);
  const command = split.shift();

  if (!command) {
    if (message.attachments) {
      client.commands.get('image')(client, message, split);
    } else {
      message.reply('Try `ASCII help` for more info on how to use the bot');
    }
    return;
  }

  if (client.commands.has(command.toLowerCase())) {
    client.logger.debug('executing command', command);
    client.commands.get(command.toLowerCase())(client, message, split);
  }
};
