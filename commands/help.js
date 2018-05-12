module.exports = (client, message, argString) => {
  const { docsUrl } = client.config;

  if (argString.length === 0) {
    message.reply(`You can find help about the commands here: ${docsUrl}.\nYou can also try \`help <commandName>\` to get a  link to the exact section.`);
    return;
  }

  const command = argString[0].trim().toLowerCase();
  if (client.commands.has(command)) {
    // if (message.channel.type !== 'dm') message.reply('Sending help in your DMs.');
    message.reply(`You can  find help about that command here: ${docsUrl}#${command}`);
  } else {
    message.reply('Command not found');
  }
};
