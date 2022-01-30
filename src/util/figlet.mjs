import figletModule from 'figlet';

/**
 * Promise wrapper for figlet() function
 *
 * @param {string} text the text to convert
 * @param {figletModule.Options} options figlet options
 * @returns {Promise<String>} converted text
 */
export const figlet = (text, options) =>
  new Promise((resolve, reject) => {
    figletModule(text, options, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });

/**
 * Promise wrapper for figlet.fonts()
 *
 * @returns {Promise<Array<string>>} array of fonts.
 */
export const getFonts = async () =>
  new Promise((resolve, reject) => {
    figletModule.fonts((error, fontsList) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(fontsList);
    });
  });
