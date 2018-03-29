module.exports = split => new Promise((resolve, reject) => {
  // prevent thrown errors if the args have wrong syntax
  try {
    let string = '';
    const args = {};

    let i = 0;
    while (i < split.length) {
      const chunk = split[i];

      if (chunk.startsWith('-')) {
        // use ++i so it gets the next chunk and then it skips it, without adding it to the string
        args[chunk] = split[++i];
      } else {
        string += chunk;
        if (i !== split.length - 1) string += ' ';
      }

      i++;
    }

    resolve({ string, args });
  } catch (err) {
    reject(err);
  }
});
