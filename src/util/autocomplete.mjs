/**
 * Try to find the options that are the most similar to query.
 *
 * @param {string} query the string to search
 * @param {Array<string>} options the strings to search amongst
 * @param {number} max the maximum numeber of options to return
 * @returns {Array<string>} the options that have been found
 */
export const completeString = (query, options, max = 10) => {
  const results = [];
  const lowercaseQuery = query.toLowerCase();

  for (const option of options) {
    if (option.toLocaleLowerCase().indexOf(lowercaseQuery) !== -1) {
      results.push(option);
    }

    if (results.length >= max) {
      break;
    }
  }

  return results;
};
