import dotenv from 'dotenv';
import { Client, Collection, Intents } from 'discord.js';
import { loadCommands } from './commandLoader.mjs';

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
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(TOKEN);
