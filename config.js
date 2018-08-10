require('dotenv').config();

if (!process.env.TOKEN) throw new Error('The bot token must be set in the .env file');

module.exports = {
  token: process.env.TOKEN,
  dblToken: process.env.TOKEN_DBL,
  logLevel: process.env.DEBUG_LEVEL || 'info',
  logDir: './log',
  prefix: process.env.PREFIX || 'ASCII',
  defaultPixels: process.env.DEF_PIXELS || '%&#MHGw*+-. ',
  docsUrl: 'https://github.com/7ixi0/discord-ascii-bot/blob/master/help.md',
  supportServerInvite: 'https://discord.gg/nE3uaSW'
};
