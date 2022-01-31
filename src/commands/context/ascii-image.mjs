import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { MessageContextMenuInteraction } from 'discord.js';

// the sharp package supports more image types that these
// TODO: test with other image types
const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

export const data = new ContextMenuCommandBuilder()
  .setName('Image to ASCII')
  .setType(ApplicationCommandType.Message);

const beautifulAsciiArt = `
  +------------------+
  |                  |
  |  Your beautiful  |
  |    ASCII art     |
  |                  |
  +------------------+
  `;

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * @param {MessageContextMenuInteraction} interaction
 */
export const execute = async (interaction) => {
  const imageAttachments = interaction.targetMessage.attachments.filter(
    (attachment) => supportedMimeTypes.includes(attachment.contentType)
  );

  if (imageAttachments.size !== 1) {
    await interaction.reply({
      content: 'The message must have one (and only one) image attachment',
      ephemeral: true,
    });
    return;
  }

  const attachment = imageAttachments.first();

  await interaction.deferReply();

  // TODO: actual conversion
  sleep(4000);
  const content = '```' + beautifulAsciiArt + '```';

  if (content.length > 2000) {
    await interaction.editReply({
      content:
        'The ASCII art that was created was more than 2000 characters long, wich is the maximum message size allowed by Discord.',
      ephemeral: true,
    });
    return;
  }

  await interaction.editReply({ content });
};
