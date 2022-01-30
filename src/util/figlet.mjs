import figletWithCallback from 'figlet';

/**
 * Promise wrapper for figlet() function
 *
 * @param {string} text the text to convert
 * @param {figletWithCallback.Options} options figlet options
 * @returns {Promise<String>} converted text
 */
export const figlet = (text, options) =>
  new Promise((resolve, reject) => {
    figletWithCallback(text, options, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
