module.exports.in = (name) => {
  if (!name) return;
  name.replace('_', ' ');
};

module.exports.out = (name) => {
  if (!name) return;
  name.replace(' ', '_');
};
