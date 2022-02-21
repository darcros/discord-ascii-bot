const MESSAGE = `Reguar chat commands for ASCII have been discontinued, please use slash commands instead.
The transition to slash commands has been made necessary by a Discord API change that will prevent ASCII from reading message content starting from May 1 2022.`;

const PREFIX = 'ASCII';

export const onMessage = (client, message) => {
  if (message.author.bot) return;

  // matches messages that start with prefix OR mention
  // regExp computes to something like /^(!|<@!?123456789123456789>)/
  // FIXME: possible regExp DoS, however this stuff is controlled by the bot owner so no big deal
  const regExp = new RegExp(`^(${PREFIX}|<@!?${client.user.id}>)`, 'i');
  const matches = regExp.exec(message.content);

  if (matches) {
    message.reply(MESSAGE);
  }
};
