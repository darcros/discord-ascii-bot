import { pipeline } from 'stream/promises';
import got from 'got';
import sharp from 'sharp';
import { PassThrough } from 'stream';

// TODO: expand the caracter list
const chars = '%&#MHGw*+-. ';
// const chars = 'BS#&@$%*!:. ';

/**
 * Calculate the maximum rectangle that has a surface area <= `maxSurface` and the same aspect ratio
 *
 * @param {number} width the image width
 * @param {number} height the image heigth
 * @param {number} maxSurface maximum surface area of the output rectangle
 * @returns
 */
const calculateSize = (width, height, maxSurface = 2000) => {
  const imageArea = width * height;

  /*
  We want to keep the aspect ratio of the image, this means that we must scale width and height by the same factor:
  (1) newW = scaleFactor * width
  (2) newH = scaleFactor * height

  We also want the are of the new image to be <= than maxSurface (we add 1 to width to account for the \n characters at the end of the lines)
  (3) (newW + 1) * newH <= maxSurface

  We substitute (1) and (2) into (3) and solve for `scaleFactor` to find the formula below.
  */
  const scaleFactor =
    (-height + Math.sqrt(height * height + 4 * imageArea * maxSurface)) /
    (2 * imageArea);

  const newW = Math.floor(scaleFactor * width);
  const newH = Math.floor(scaleFactor * height);
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
  originalHeight,
  maxChars
) => {
  const [width, height] = calculateSize(
    originalWidth,

    // Since pixels are square but character are not, we must squish the image so that it doesn't look stretched after being converted to ASCII
    // TODO: calculate an accurate value, this value was just eyeballed
    originalHeight * 0.4,
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
