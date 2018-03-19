const request = require('request');
const stream = require('stream');
// TODO: fix typo
const getImageStreamInfo = require('./getImageStreamInfo');
const calculateImageFit = require('./calculateAspectRatioFit');
const imageToASCII = require('./imageStreamToAscii');

// TODO: move into the immage command
function urlAsciiImageConversion(url) {
  return new Promise((resolve, reject) => {
    // TODO: .get is unnecessary
    const imageStream = request.get(url);
    imageStream.on('error', reject);

    // FIXME: find a more elegant way
    const backupStream = new stream.PassThrough();
    imageStream.pipe(backupStream);

    getImageStreamInfo(imageStream)
      .then((info) => {
        const calculatedDimesions = calculateImageFit(info.width, info.height, 44, 44);

        imageToASCII(backupStream, calculatedDimesions.width, calculatedDimesions.height, false)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

module.exports = urlAsciiImageConversion;
