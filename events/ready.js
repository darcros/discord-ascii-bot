module.exports = (client) => {
  client.logger.info('Logged in', {
    username: client.user.tag,
    id: client.user.id
  });
};
