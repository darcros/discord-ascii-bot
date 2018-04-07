const urlImageToAscii = require('../functions/image/ImageUrlToAscii');

// TODO: pass custom charset
module.exports = (client, message, args) => {
  let foundImage = false;

  message.attachments.forEach((attachment) => {
    // if the attachment is an image
    if (attachment.width && attachment.height) {
      foundImage = true;

      // avoid GIF files
      if (attachment.filename.endsWith('.gif')) {
        message.reply('GIFs are not supported.');
        return;
      }

      // get width and height
      const customWidth = args.w || args.width;
      const customHeight = args.h || args.height;

      // convert image
      // using 'proxyURL' instead of 'url' so the IP of the bot doesn't leak
      urlImageToAscii(
        attachment.proxyURL,
        attachment.width, attachment.height,
        customWidth, customHeight,
        false
      )
        .then((ascii) => {
          // send result
          message.channel.send(ascii, { code: true });
        })
        .catch((err) => {
          message.reply('an unknown error occurred');
          client.log('error', err);
        });
    }
  });

  if (!foundImage) message.reply('you must attach an image to you message.');
};
