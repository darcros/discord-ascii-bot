const minimist = require('minimist');
const Joi = require('joi');

const urlImageToAscii = require('../functions/image/ImageUrlToAscii');

const parser = argString => minimist(argString, {
  alias: {
    height: 'h',
    width: 'w',
    charset: ['chars', 'c']
  }
});

const validator = args => Joi.validate(args, {
  height: Joi.number().integer().min(1),
  width: Joi.number().integer().min(1),
  charset: Joi.string() // NOTE: empty strings are disallowed by default
}, {
  allowUnknown: true // ignore aliases and args._
});

module.exports = (client, message, argString) => {
  const args = parser(argString);
  const { error } = validator(args);
  if (error) {
    message.reply(error.details[0].message);
    return;
  }

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

      // convert image
      // using 'proxyURL' instead of 'url' so the IP of the bot doesn't leak
      urlImageToAscii(
        attachment.proxyURL,
        attachment.width, attachment.height,
        args.width, args.height,
        args.charset
      )
        .then((ascii) => {
          // send result
          message.channel.send(ascii, { code: true });
        })
        .catch((err) => {
          if (err.message === 'Too big') {
            message.reply('The dimensions you specified are too big.\nThe maximum size of a Discord message is 2000 characters.');
          } else {
            message.reply('An unknown error occurred');
            client.log('error', err);
          }
        });
    }
  });

  if (!foundImage) message.reply('you must attach an image to you message.');
};
