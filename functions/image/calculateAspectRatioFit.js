/*
FIXME: find better proportion than 7 / 9
*/
module.exports = (srcWidth, srcHeight, maxWidth, maxHeight, heightMultiplier = 7 / 11) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    newWidth: Math.round(srcWidth * ratio),
    newHeight: Math.round(srcHeight * ratio * heightMultiplier)
  };
};
