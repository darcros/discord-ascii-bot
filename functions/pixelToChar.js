// const defaultPixels = '%&#MHGw*+-. ';
const { defaultPixels } = require('../config.json');

// TODO: throw error on missing params
// TODO: use default parameters for customPixels
function getChar(r, g, b, a, customPixels) { // TODO: move to different file
  const pixels = customPixels || defaultPixels;
  let brightness = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  if (a !== undefined &&
    a !== null &&
    a !== false &&
    a !== 0) brightness *= a;

  const index = Math.round((brightness / 255) * (pixels.length - 1));
  return pixels.charAt(index);
}

module.exports = getChar;
