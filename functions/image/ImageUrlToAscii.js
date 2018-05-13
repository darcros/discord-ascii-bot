const request = require('request');
const calculateImageFit = require('./calculateAspectRatioFit');
const imageToASCII = require('./imageStreamToAscii');

// TODO: try to make this function less ugly
module.exports = (
  url,
  realWidth, realHeight,
  customWidth, customHeight,
  customChars
) => new Promise((resolve, reject) => {
  if (!url) reject(new Error('Url is required'));
  if (!realWidth) reject(new Error('realWidth is required'));
  if (!realHeight) reject(new Error('realHeight is required'));

  const imageStream = request.get(url);
  imageStream.on('error', reject);

  // TODO: find better resize method that keeps in mind number of chars not size
  const { newWidth, newHeight } = calculateImageFit(realWidth, realHeight, 44, 44);

  const finalWidth = customWidth || newWidth;
  const finalHeight = customHeight || newHeight;

  if (finalWidth * finalHeight > 2000) reject(new Error('Too big'));

  imageToASCII(imageStream, finalWidth, finalHeight, customChars)
    .then(resolve)
    .catch(reject);
});
