import { pipeline } from 'stream/promises';
import got from 'got';
import sharp from 'sharp';
import { PassThrough } from 'stream';

// TODO: expand the caracter list
const chars = '%&#MHGw*+-. ';
// const chars = 'BS#&@$%*!:. ';

/**
 * Calculate the maximum rectangle that has an area less that maxChars and the same aspect ratio (width/height) as the image
 *
 * @param {number} width the image width
 * @param {number} height the image heigth
 * @param {number} maxChars maximum number of chars allowed in Discord message
 * @param {number} heightMultiplier allows to scale the images height so it doesn't look stretched when after being converted to ASCII characters.
 * @returns
 */
const calculateSize = (
  width,
  height,
  maxChars = 2000,
  //  0.375
  heightMultiplier = 0.4 // TODO: calculate an accurate value, this value was just eyeballed
) => {
  const w = width;
  const h = height * heightMultiplier;

  const imageArea = w * h;
  const scaleFactor = Math.sqrt(maxChars / imageArea);

  const newW = Math.floor(scaleFactor * w);
  const newH = Math.floor(scaleFactor * h);
  return [newW, newH];
};

function toAscii(alphabet) {
  return async function* (source) {
    for await (const chunk of source) {
      let string = '';

      for (const byte of chunk) {
        const index = Math.floor((byte / 255) * (alphabet.length - 1));
        string += alphabet[index];
      }

      yield string;
    }
  };
}

function groupLines(lineLength) {
  return async function* (source) {
    let line = '';

    for await (const string of source) {
      let start = 0;
      let end = lineLength - line.length;

      while (start < string.length) {
        const piece = string.substring(start, end);
        line += piece;

        start += piece.length;
        end += piece.length;

        if (line.length >= lineLength) {
          yield line + '\n';
          line = '';
        }
      }
    }
  };
}

export const urlToAscii = async (
  url,
  originalWidth,
  origianalHeight,
  maxChars
) => {
  const [width, height] = calculateSize(
    originalWidth,
    origianalHeight,
    maxChars
  );

  const imageTransformer = sharp()
    .resize({
      width,
      height,
      fit: 'fill', // ignore aspect ratio
    })
    .flatten({ background: '#FFFFFF' }) // remove alpha and replace with white background
    .normalise()
    .sharpen() // makes the edges look a bit better
    .toColorspace('b-w')
    .raw();

  const destination = new PassThrough();

  const promise = pipeline(
    got.stream(url),
    imageTransformer,
    toAscii(chars),
    groupLines(width),
    destination
  );

  let asciiImage = '';
  for await (const line of destination) {
    asciiImage += line;
  }

  await promise;
  return asciiImage;
};
