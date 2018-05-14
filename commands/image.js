const minimist = require('minimist');
const Joi = require('joi');

const sendHelp = require('../functions/sendHelp');
const urlImageToAscii = require('../functions/image/ImageUrlToAscii');

const parser = argString => minimist(argString, {
  alias: {
    height: 'h',
    width: 'w',
    charset: ['chars', 'c']
  },
  boolean: ['help']
});

const validator = args => Joi.validate(args, {
  height: Joi.number().integer().min(1),
  width: Joi.number().integer().min(1),
  charset: Joi.string(), // NOTE: empty strings are disallowed by default
  help: Joi.boolean()
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
  if (args.help) {
    sendHelp(message, 'image', 'inlineOption');
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

      client.logger.debug('rendering image', {
        url: attachment.proxyURL,
        originalWidth: attachment.width,
        originalHeight: attachment.height,
        customWidth: args.width,
        customHeight: args.height,
        customCharset: args.charset
      });

      // convert image
      // using 'proxyURL' instead of 'url' so the IP of the bot doesn't leak
      urlImageToAscii(
        attachment.proxyURL,
        attachment.width, attachment.height,
        args.width, args.height,
        args.charset
      )
        .then((ascii) => {
          client.logger.debug('rendered image', {
            length: ascii.length
          });

          // send result
          // FIXME: if somehow the message is bigger than 2000 chars this throws an error
          message.channel.send(ascii, { code: true });
        })
        .catch((err) => {
          if (err.message === 'Too big') {
            message.reply('the dimensions you specified are too big.\nThe maximum size of a Discord message is 2000 characters.');
          } else {
            message.reply('an unknown error occurred');
            client.logger.error('Could not convert the URL to ascii', err);
          }
        });
    }
  });

  if (!foundImage) message.reply('you must attach an image to your message.');
};
