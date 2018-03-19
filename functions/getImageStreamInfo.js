const sharp = require('sharp');

function getImageStreamInfo(stream) {
  return new Promise((resolve, reject) => {
    // FIXME: find better name for variable
    const snooper = sharp()
      .on('info', resolve)
      .on('error', reject);

    stream
      .pipe(snooper)
      // TODO: find more elegant way of consuming the stream
      .on('data', () => {});

    setTimeout(() => {
      reject(new Error('Timeout'));
    }, 10 * 1000);
  });
}

module.exports = getImageStreamInfo;
