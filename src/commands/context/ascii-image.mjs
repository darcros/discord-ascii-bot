import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { MessageContextMenuInteraction } from 'discord.js';
import { urlToAscii } from '../../util/imageToAscii.mjs';

// the sharp package supports more image types that these
const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

export const data = new ContextMenuCommandBuilder()
  .setName('Image to ASCII')
  .setType(ApplicationCommandType.Message);

/**
 * @param {MessageContextMenuInteraction} interaction
 */
export const execute = async (interaction) => {
  const imageAttachments = interaction.targetMessage.attachments.filter(
    (attachment) => attachment.contentType.startsWith('image')
  );
  if (imageAttachments.size !== 1) {
    await interaction.reply({
      content: 'The message must have one (and only one) image attachment',
      ephemeral: true,
    });
    return;
  }

  const attachment = imageAttachments.first();
  if (!supportedMimeTypes.includes(attachment.contentType)) {
    await interaction.reply({
      content: 'Unsupported image type. Supported types are JPEG, PNG, WEBP',
      ephemeral: true,
    });
    return;
  }

  await interaction.deferReply();

  const result = await urlToAscii(
    attachment.proxyURL,
    attachment.width,
    attachment.height,
    // account for the maximum message length and also the ``` characters that need to be appended and prepended to the message
    2000 - 6
  );
  const content = '```' + result + '```';

  if (content.length > 2000) {
    await interaction.editReply({
      content:
        'The ASCII art that was created was more than 2000 characters long, wich is the maximum message size allowed by Discord.',
    });
    return;
  }

  await interaction.editReply({ content });
};
