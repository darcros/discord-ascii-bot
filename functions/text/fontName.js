function input(name) {
  return name.replace('_', ' ');
}

function output(name) {
  return name.replace(' ', '_');
}

module.exports.in = input;
module.exports.out = output;
