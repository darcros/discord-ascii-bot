const urlImageToAscii = require('../functions/ImageUrlToAscii');
const { Message, Client } = require('discord.js');

/**
 * image to ascii command
 * @param {Client} client
 * @param {Message} message
 * @param {Array<string>} args
 */
module.exports = (client, message) => {
  message.attachments.forEach(() => {
    message.attachments.forEach((attachment) => {
      // if the attachment is an image
      // FIXME: check mime type and magic numbers to be sure it's an image
      // event though magic numbers are probably alrteady checked by sharp

      // TODO: send error if none of the attachments were images
      if (attachment.width && attachment.height) {
        if (attachment.filename.endsWith('.gif')) return; // avoid gifs

        // convert image
        // use 'proxyURL' instead of 'url' so the IP of the bot doesn't leak
        urlImageToAscii(attachment.proxyURL)
          .then((ascii) => {
            // send result
            message.channel.send(ascii, { code: true });
          })
          // TODO: inform user of the error
          .catch(err => client.log('error', err));
      }
    });
  });
};
