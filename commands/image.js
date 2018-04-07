const urlImageToAscii = require('../functions/image/ImageUrlToAscii');

module.exports = (client, message) => {
  let foundImage = false;

  message.attachments.forEach((attachment) => {
    // if the attachment is an image
    // FIXME: also check mime type to be sure it's an image

    // TODO: send error if none of the attachments were images
    if (attachment.width && attachment.height) {
      foundImage = true;

      // avoid GIF files
      if (attachment.filename.endsWith('.gif')) {
        message.reply('GIFs are not supported.');
        return;
      }

      // convert image
      // using 'proxyURL' instead of 'url' so the IP of the bot doesn't leak
      urlImageToAscii(attachment.proxyURL, attachment.width, attachment.height)
        .then((ascii) => {
          // send result
          message.channel.send(ascii, { code: true });
        })
        // TODO: inform user of the error
        .catch((err) => {
          message.reply('an unknown error occurred');
          client.log('error', err);
        });
    }
  });

  if (!foundImage) message.reply('you must attach an image to you message.');
};
