// const defaultPixels = '%&#MHGw*+-. ';
const { defaultPixels } = require('../../config');

module.exports = (r, g, b, customPixels) => {
  const pixels = customPixels || defaultPixels;
  const brightness = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

  const index = Math.round((brightness / 255) * (pixels.length - 1));
  return pixels.charAt(index);
};
