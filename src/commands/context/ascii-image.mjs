import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { UserContextMenuInteraction } from 'discord.js';

export const data = new ContextMenuCommandBuilder()
  .setName('Image to ASCII')
  .setType(ApplicationCommandType.Message);

/**
 * @param {UserContextMenuInteraction} interaction
 */
export const execute = async (interaction) => {
  await interaction.reply('pong');
};
