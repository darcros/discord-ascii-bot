import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import { dispath } from './interactionDispatcher.mjs';
import { onMessage } from './handleChatEvent.mjs';

// load env variables
dotenv.config();
const { TOKEN } = process.env;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    // TODO: remove after May 1, 2022 when the bot will no longer have access to message content
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  await dispath(interaction);
});

// Respond to chat commands telling the user to use the slash commands instead
// TODO: remove after May 1, 2022 when the bot will no longer have access to message content
client.on('messageCreate', (msg) => onMessage(client, msg));

client.login(TOKEN);
