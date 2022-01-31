import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import { dispath } from './interactionDispatcher.mjs';

// load env variables
dotenv.config();
const { TOKEN } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  await dispath(interaction);
});

client.login(TOKEN);
