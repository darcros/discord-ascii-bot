import got from 'got';
import sharp from 'sharp';

// TODO: expand the caracter list
const chars = '%&#MHGw*+-. ';
// const chars = 'BS#&@$%*!:. ';

/**
 * @param {number} width the image width
 * @param {number} height the image heigth
 * @param {number} maxChars maximum character to use for the ASCII image
 * @returns
 */
const calculateSize = (width, height, maxChars = 2000) => {
  const imageArea = width * height;

  /*
  We want to keep the aspect ratio of the image, this means that we must scale width and height by the same factor:
  (1) newW = scaleFactor * width
  (2) newH = scaleFactor * height

  We also want the are of the new image to be <= than maxChars (we add 1 to width to account for the \n characters at the end of the lines)
  (3) (newW + 1) * newH <= maxChars

  We substitute (1) and (2) into (3) and solve for `scaleFactor` to find the formula below.
  */
  const scaleFactor =
    (-height + Math.sqrt(height * height + 4 * imageArea * maxChars)) /
    (2 * imageArea);

  const newW = Math.floor(scaleFactor * width);
  const newH = Math.floor(scaleFactor * height);
  return [newW, newH];
};

function bufferToAscii(buffer, alphabet, width) {
  let asciiImage = '';
  let i = 0;

  for (const byte of buffer) {
    const index = Math.floor((byte / 255) * (alphabet.length - 1));
    asciiImage += alphabet[index];

    i++;
    if (i >= width) {
      asciiImage += '\n';
      i = 0;
    }
  }

  return asciiImage;
}

export const urlToAscii = async (url, maxChars) => {
  const imageResponse = await got(url, { responseType: 'buffer' });
  const meta = await sharp(imageResponse.body).metadata();

  const [width, height] = calculateSize(
    meta.width,

    // Since pixels are square but character are not, we must squish the image so that it doesn't look stretched after being converted to ASCII
    // TODO: calculate an accurate value, this value was just eyeballed
    meta.height * 0.4,
    maxChars
  );

  const transformedBuffer = await sharp(imageResponse.body)
    .resize({
      width,
      height,
      fit: 'fill', // ignore aspect ratio
    })
    .flatten({ background: '#FFFFFF' }) // remove alpha and replace with white background
    .normalise()
    .sharpen() // makes the edges look a bit better
    .toColorspace('b-w')
    .raw()
    .toBuffer();

  return bufferToAscii(transformedBuffer, chars, width);
};
