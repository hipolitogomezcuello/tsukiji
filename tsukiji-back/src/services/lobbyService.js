const { v4: uuidv4 } = require('uuid');

const lobbies = {}

const findAll = () => {
  return Object.values(lobbies)
}

const findById = id => {
  return lobbies[id];
}

const create = lobby => {
  const newLobby = {
    id: lobby.id ? lobby.id : uuidv4(), //TODO ONLY FOR DEVELOP
    name: lobby.name,
    users: [],
  }
  lobbies[newLobby.id] = newLobby;
  return newLobby;
}

const userLeave = (user, lobby) => {
  const newUsers = lobbies[lobby.id].users.filter(currentUser => currentUser.id !== user.id);
  lobbies[lobby.id].users = newUsers;
}

const remove = lobby => {
  delete lobbies[lobby.id];
}

module.exports = {
  findAll,
  findById,
  create,
  userLeave,
  remove,
}