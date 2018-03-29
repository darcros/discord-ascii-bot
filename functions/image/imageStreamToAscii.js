const sharp = require('sharp');
const getChar = require('./pixelToChar');

// TODO: throw error if missing params
// TODO: pass custom charset
// TODO: pass custom output width and height
module.exports = (stream, width, height, customChars) => new Promise((resolve, reject) => {
  let ASCIIString = '';

  // create image processing pipeline with sharp
  // FIXME: create a pipeline and the use .clone() instead of creating a new instance every time
  const transformer = sharp()
    .resize(width, height)
    // ignore the aspect ratio because the size passed in should be right
    .ignoreAspectRatio()
    // make sure to use the right colorspace
    .toColorspace('srgb')
    // set white background for next action
    .background({
      r: 255,
      g: 255,
      b: 255,
      alpha: 1
    })
    // merge with background to remove alpha channel
    .flatten()
    .raw();

  transformer.on('error', reject);

  transformer.on('data', (chunk) => {
    // +=3 because there are 3 channels (red, green, blue)
    for (let i = 0; i < chunk.length; i += 3) {
      // TODO: test custom charset
      // TODO: before having all these variables it looked faster, do benchmark
      const r = chunk[i];
      const g = chunk[i + 1];
      const b = chunk[i + 2];
      // const a = channels === 4 ? chunk[i + 3] : false;
      const char = getChar(r, g, b, false || customChars);
      ASCIIString += char;
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
