import { SlashCommandBuilder } from '@discordjs/builders';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { figlet, getFonts } from '../util/figlet.mjs';
import { completeString } from '../util/autocomplete.mjs';

// since the fonts dont change we can cache them here
const fontsList = await getFonts();

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
    option
      .setName('font')
      .setDescription('The FIGlet font to use')
      .setAutocomplete(true) // I have to use autocomplete instead of choices because there are too many fonts
      .setRequired(false)
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
 * @param {AutocompleteInteraction} interaction
 */
const autocompleteFont = async (interaction) => {
  const incompleteFont = interaction.options.getString('font', false) || '';

  const choices = completeString(incompleteFont, fontsList).map((font) => ({
    name: font,
    value: font,
  }));

  await interaction.respond(choices);
};

export const autocomplete = { font: autocompleteFont };

/**
 * @param {CommandInteraction} interaction
 */
export const execute = async (interaction) => {
  const text = interaction.options.getString('text', true);
  const kerning = interaction.options.getString('kerning', false);

  // since we cant use choiches for the fonts we have to manually check that the user has picked a font that actually exists
  const fontOption = interaction.options.getString('font', false);
  const font = fontsList.find(
    (f) => f.toLowerCase() === fontOption.toLowerCase()
  );
  if (!font) {
    await interaction.reply({
      content:
        'That font does not exist. Please select a font from the autocomplete options.',
      ephemeral: true,
    });
    return;
  }

  const result = await figlet(text, {
    font: fontOption,
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
