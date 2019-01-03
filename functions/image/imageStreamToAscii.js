const sharp = require('sharp');

// const defaultPixels = '%&#MHGw*+-. ';
const { defaultPixels } = require('../../config');

module.exports = (stream, width, height, customChars) => new Promise((resolve, reject) => {
  if (!stream) reject(new Error('stream is required'));
  if (!width) reject(new Error('width is required'));
  if (!height) reject(new Error('height is required'));

  const pixels = customChars || defaultPixels;
  let ASCIIString = '';

  const transformer = sharp()
    .resize(width, height)
    // ignore the aspect ratio because the size passed in should be right
    .ignoreAspectRatio()
    // convert image to black and white
    .toColorspace('b-w')
    .raw();

  transformer.on('error', reject);

  transformer.on('data', (chunk) => {
    for (let i = 0; i < chunk.length; i++) {
      const brightness = chunk[i];
      const index = Math.floor((brightness / 255) * (pixels.length - 1));
      ASCIIString += pixels.charAt(index);
    }
  });

  transformer.on('end', () => {
    for (let i = width; i < ASCIIString.length; i += width + 1) {
      // add new lines at the specified width
      ASCIIString = `${ASCIIString.slice(0, i)}\n${ASCIIString.slice(i)}`;
    }

    resolve(ASCIIString);
  });

  stream
    .pipe(transformer);
});
