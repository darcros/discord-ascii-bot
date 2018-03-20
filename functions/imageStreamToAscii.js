const sharp = require('sharp');
const getChar = require('./pixelToChar');

// TODO: throw error if missing params
// TODO: pass custom charset
// TODO: pass custom output width and heigth
function imageStreamToAscii(stream, width, heigth, cusotmChars) {
  return new Promise((resolve, reject) => {
    let ASCIIString = '';

    // create image processing pipeline with sharp
    // FIXME: create a pipeline and the use .clone() instead of creating a new instance every time
    const transformer = sharp()
      // TODO: find better way, the real limit is not the width and heigth but total size
      // TODO: scale values to compensate for characters being more tall than wide
      .resize(width, heigth)
      // aspect ratio is ignored because the size passed in should be right
      .ignoreAspectRatio()
      // make sure to use the right colorspace
      // .toColorspace('srgb')
      .raw();

    // TODO: write shorter
    transformer.on('error', (err) => {
      reject(err);
    });

    transformer.on('info', (info) => {
      const { channels } = info;

      transformer.on('data', (chunk) => {
        // +=3 because there are 3 channels (red, green, blue)
        for (let i = 0; i < chunk.length; i += channels) {
          // TODO: test custom charset
          const a = channels === 4 ? chunk[1 + 3] : false;
          console.log(a);
          const char = getChar(chunk[i], chunk[i + 1], chunk[i + 2], a, false || cusotmChars);
          ASCIIString += char;
        }
      });
    });

    // FIXME: if the dimesions are passed in the args there is no need to wait the event
    transformer.on('info', (info) => {
      // FIXME: having event listeners inside other event listeners is not a good idea
      // the stram could end before calling info but i'm not sure and i would cause an error anyway
      transformer.on('end', () => {
        for (let i = info.width; i < ASCIIString.length; i += info.width + 1) {
          // add new lines at the width
          // FIXME: splice is very expensive, maybe it's best to create a new string
          ASCIIString = `${ASCIIString.slice(0, i)}\n${ASCIIString.slice(i)}`;
        }

        resolve(ASCIIString);
      });
    });

    stream
      .pipe(transformer)
      // FIXME: find better way
      .on('data', () => { });
  });
}

module.exports = imageStreamToAscii;
