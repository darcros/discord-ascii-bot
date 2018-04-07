// const defaultPixels = '%&#MHGw*+-. ';
const { defaultPixels } = require('../../config.json');

module.exports = (r, g, b, customPixels) => {
  if (!r) throw new Error('r is required');
  if (!g) throw new Error('g is required');
  if (!b) throw new Error('b is required');

  const pixels = customPixels || defaultPixels;
  const brightness = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

  const index = Math.round((brightness / 255) * (pixels.length - 1));
  return pixels.charAt(index);
};
