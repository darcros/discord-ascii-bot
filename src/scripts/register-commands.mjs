import dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { loadCommands } from '../commandLoader.mjs';

// load env variables
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    const commands = await loadCommands();
    const body = [...commands.context, ...commands.slash].map(
      (command) => command.data
    );

    // for now guild commands only
    // TODO: add option to update global commands
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
