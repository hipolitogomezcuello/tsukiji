const { v4: uuidv4 } = require('uuid');

const users = {};

const create = data => {
  const id = uuidv4();
  const newUser = {
    id,
    username: data.username,
  }
  users[id] = newUser;
  return newUser;
}

const findAll = () => {
  return Object.values(users);
}

module.exports = {
  create,
  findAll,
}