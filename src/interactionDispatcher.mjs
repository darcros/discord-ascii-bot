import {
  AutocompleteInteraction,
  Collection,
  CommandInteraction,
} from 'discord.js';
import { loadCommands } from './commandLoader.mjs';

const commands = new Collection(
  (await loadCommands()).map((command) => [command.data.name, command])
);

/**
 * @param {AutocompleteInteraction} interaction
 */
const dispatchAutocomplete = async (interaction) => {
  const command = commands.get(interaction.commandName);
  if (!command) return;

  const focusedOption = interaction.options.getFocused(true);

  const completer = command.autocomplete[focusedOption.name];
  if (!completer) return;

  try {
    completer(interaction);
  } catch (error) {
    console.error(error);
  }
};

/**
 * @param {CommandInteraction} interaction
 */
const dispathCommand = async (interaction) => {
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
};

/**
 * @param {CommandInteraction} interaction
 */
export const dispath = async (interaction) => {
  if (interaction.isAutocomplete()) {
    return dispatchAutocomplete(interaction);
  }

  if (interaction.isCommand()) {
    return dispathCommand(interaction);
  }
};
