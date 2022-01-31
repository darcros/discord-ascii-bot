import {
  AutocompleteInteraction,
  Collection,
  CommandInteraction,
  ContextMenuInteraction,
} from 'discord.js';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { loadCommands } from './commandLoader.mjs';

const buildCommandCollection = (commandList) =>
  new Collection(commandList.map((command) => [command.data.name, command]));

const commands = await loadCommands();
const contextCommands = buildCommandCollection(commands.context);
const slashCommands = buildCommandCollection(commands.slash);

/**
 * @param {AutocompleteInteraction} interaction
 */
const dispatchAutocomplete = async (interaction) => {
  const command = slashCommands.get(interaction.commandName);
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

const respondWithErrorMessage = async (interaction) => {
  if (!interaction.replied) {
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
};

/**
 * @param {ContextMenuInteraction} interaction
 */
const dispatchContextMenuCommand = async (interaction) => {
  const command = contextCommands.get(interaction.commandName);
  if (!command) return;

  // ensure that context type is the same in interaction and message
  if (
    (interaction.isUserContextMenu() &&
      command.data.type !== ApplicationCommandType.User) ||
    (interaction.isMessageContextMenu() &&
      command.data.type !== ApplicationCommandType.Message)
  )
    return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await respondWithErrorMessage(interaction);
  }
};

/**
 * @param {CommandInteraction} interaction
 */
const dispathCommand = async (interaction) => {
  const command = slashCommands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await respondWithErrorMessage(interaction);
  }
};

/**
 * @param {CommandInteraction} interaction
 */
export const dispath = async (interaction) => {
  if (interaction.isAutocomplete()) {
    return dispatchAutocomplete(interaction);
  }

  if (interaction.isContextMenu()) {
    return dispatchContextMenuCommand(interaction);
  }

  if (interaction.isCommand()) {
    return dispathCommand(interaction);
  }
};
