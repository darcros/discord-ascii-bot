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

  // FIXME: if the dimensions are passed in the args there is no need to wait the event
  // TODO: merge this event listener to the other one
  transformer.on('info', (info) => {
    // FIXME: having event listeners inside other event listeners is not a good idea
    // the stream could end before calling info but it would cause an error anyway
    transformer.on('end', () => {
      for (let i = info.width; i < ASCIIString.length; i += info.width + 1) {
        // add new lines at the specified width
        // FIXME: splice is very expensive, maybe it's best to create a new string
        ASCIIString = `${ASCIIString.slice(0, i)}\n${ASCIIString.slice(i)}`;
      }

      resolve(ASCIIString);
    });
  });

  stream
    .pipe(transformer)
  // consume the stream
  // FIXME: the stream gets already consumed by transformer.on('data')
    .on('data', () => { });
});
