module.exports.in = (name) => {
  if (!name) return undefined;
  return name.replace('_', ' ');
};

module.exports.out = (name) => {
  if (!name) return undefined;
  return name.replace(' ', '_');
};
