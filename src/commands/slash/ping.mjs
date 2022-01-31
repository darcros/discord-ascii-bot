import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('ping');

/**
 * @param {CommandInteraction} interaction
 */
export const execute = async (interaction) => {
  await interaction.reply('pong');
};
