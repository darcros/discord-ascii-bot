const { docsUrl } = require('../config');

module.exports = (message, cmdName, type) => {
  const url = `${docsUrl}#${cmdName}`;

  switch (type) {
    case 'inlineOption':
      message.reply(`you can find help about this command here: ${url}`);
      break;

    case 'helpCommand':
      message.reply(`you can  find help about that command here: ${url}`);
      break;

    default:
      message.reply(`help: ${url}`);
  }
};
