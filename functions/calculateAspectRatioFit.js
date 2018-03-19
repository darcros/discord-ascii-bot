function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: Math.round(srcWidth * ratio),
    /*
    FIXME: to find the 7 / 9 proportion i took a screenshot of the Discord
    window on my PC an the counted how pixel big were a the letters inside a codeblock
    */
    height: Math.round(srcHeight * ratio * (7 / 9))
  };
}

module.exports = calculateAspectRatioFit;
