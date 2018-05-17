module.exports.in = (name) => {
  if (!name) return undefined;
  return name.replace(/_/g, ' ');
};

module.exports.out = (name) => {
  if (!name) return undefined;
  return name.replace(/ /g, '_');
};
