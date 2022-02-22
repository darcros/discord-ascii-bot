import dotenv from 'dotenv';
import { Command, Option } from 'commander';
import enquirer from 'enquirer';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { loadCommands } from '../commandLoader.mjs';

const program = new Command();

program
  .addOption(
    new Option(
      '--target <type>',
      'Specify whether the commands should be registered to a specific guild or globally. When using `--target guild` also specify --guild-id.'
    )
      .choices(['guild', 'global'])
      .default('guild')
      .makeOptionMandatory(true)
  )
  .addOption(
    new Option('--token <token>', 'The Discord API token.')
      .makeOptionMandatory(true)
      .env('TOKEN')
  )
  .addOption(
    new Option(
      '--client <id>',
      'The ID of the application client to which the commands shall belong to.'
    )
      .env('CLIENT_ID')
      .makeOptionMandatory(true)
  )
  .addOption(
    new Option(
      '--guild <id>',
      'The ID of the guild to register the commands to. (only if `--target guild`)'
    ).env('GUILD_ID')
  );

const updateGuild = async (commandsArr, opts, rest) => {
  if (!opts.guild) {
    console.error('Missing --guild option (or GUILD_ID environment variable).');
    return;
  }

  console.info('Registering application guild commands...', {
    client: opts.client,
    guild: opts.guild,
  });

  await rest.put(Routes.applicationGuildCommands(opts.client, opts.guild), {
    body: commandsArr,
  });

  console.info('Successfully registered application guild commands.');
};

const updateGlobal = async (commandsArr, opts, rest) => {
  if (process.env.NODE_ENV?.toLowerCase() !== 'production') {
    const response = await enquirer.prompt({
      type: 'confirm',
      name: 'confirmUpdate',
      message: 'Are you sure you want to update the global commands?',
    });
    if (!response.confirmUpdate) {
      console.info('Canceled.');
      return;
    }
  }

  console.info('Registering application commands globally...', {
    client: opts.client,
  });

  await rest.put(Routes.applicationCommands(opts.client), {
    body: commandsArr,
  });

  console.info('Successfully registered application commands globally.');
};

(async () => {
  // load env variables
  dotenv.config();

  // parse options
  program.parse();
  const opts = program.opts();

  const commandsObj = await loadCommands();
  const commandsArr = [...commandsObj.context, ...commandsObj.slash].map(
    (command) => command.data
  );

  const rest = new REST({ version: '9' }).setToken(opts.token);
  try {
    if (opts.target === 'global') {
      await updateGlobal(commandsArr, opts, rest);
    } else {
      await updateGuild(commandsArr, opts, rest);
    }
  } catch (error) {
    console.error(error);

    // exit with non-zero code to signal failure
    process.exit(1);
  }
})();
