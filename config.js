require('dotenv').config();

if (!process.env.TOKEN) throw new Error('The bot token must be set in the .env file');

module.exports = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX || '!',
  defaultPixels: process.env.DEF_PIXELS || '%&#MHGw*+-. ',
  docsUrl: 'https://bitbucket.org/7ixi0/discord-asciibot/src/master/help.md'
};
