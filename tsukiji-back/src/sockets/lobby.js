const userService = require('../services/userService');
const lobbyService = require('../services/lobbyService');
const io = require('socket.io');

const init = socket => {
  socket.on('clientCreatesUser', data => {
    const user = userService.create(data);
    socket.emit('serverCreatedUser', user);
  });

  socket.on('clientAsksForLobbies', data => {
    const lobbies = lobbyService.findAll();
    socket.emit('serverReturnsLobbies', lobbies);
  });
};


module.exports = init;