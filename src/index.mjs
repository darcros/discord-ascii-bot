import dotenv from 'dotenv';
import { Client, Collection, Intents } from 'discord.js';
import { loadCommands } from './commandLoader.mjs';
import { dispath } from './interactionDispatcher.mjs';

// load env variables
dotenv.config();
const { TOKEN } = process.env;

const commands = new Collection(
  (await loadCommands()).map((command) => [command.data.name, command])
);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  await dispath(interaction);
});

client.login(TOKEN);
