const io = require('socket.io')(5500);
const initLobby = require('./sockets/lobby')

const app = async () => {
  io.on('connection', socket => {
    console.log('new connection');
  });
  io.of('/lobby').on('connection', socket => {
    initLobby(socket);
  })
}

module.exports = app;