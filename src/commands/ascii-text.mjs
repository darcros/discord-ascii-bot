import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { figlet } from '../util/figlet.mjs';

export const data = new SlashCommandBuilder()
  .setName('ascii-text')
  .setDescription('Converts the text to ASCII art using FIGlet')
  .addStringOption((option) =>
    option
      .setName('text')
      .setDescription('The text to convert')
      .setRequired(true)
  )
  .addStringOption((option) =>
    // NOTE: kerning is actually horizontalLayout disguised;
    //   verticalLayout is not exposed since string entered through Discord can only be one line

    option
      .setName('kerning')
      .setDescription("Allows to override the font's default kerning")
      .addChoices([
        ['Default', 'default'],
        ['Full', 'full'],
        ['Fitted', 'fitted'],
        ['Controlled Smushing', 'controlled smushing'],
        ['Universal Smushing', 'universal smushing'],
      ])
      .setRequired(false)
  );

/**
 * @param {CommandInteraction} interaction
 */
export const execute = async (interaction) => {
  const text = interaction.options.getString('text', true);
  const kerning = interaction.options.getString('kerning', false) || 'default';

  const result = await figlet(text, {
    horizontalLayout: kerning,
  });
  const content = '```' + result + '```';

  if (content.length > 2000) {
    await interaction.reply({
      content:
        'The text you entered is too long. The resulting ASCII art would be more than 2000 character, wich is the maximum message size allowed by Discord.',
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({ content });
};
