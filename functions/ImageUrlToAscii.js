const request = require('request');
// const stream = require('stream');
const calculateImageFit = require('./calculateAspectRatioFit');
const imageToASCII = require('./imageStreamToAscii');

// TODO: move into the immage command
function urlAsciiImageConversion(url, width, height) {
  return new Promise((resolve, reject) => {
    // TODO: .get is unnecessary
    const imageStream = request.get(url);
    imageStream.on('error', reject);

    // TODO: find better resize method that keeps in mind numer of chars not size
    const { newWidth, newHeight } = calculateImageFit(width, height, 44, 44);
    imageToASCII(imageStream, newWidth, newHeight, false)
      .then(resolve)
      .catch(reject);
  });
}

module.exports = urlAsciiImageConversion;