module.exports = (client) => {
  client.log('info', `Logged in: '${client.user.tag}' (${client.user.id})`);
};
