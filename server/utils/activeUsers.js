let activeUsers = [];

function addUser(user) {
  activeUsers.push(user);
}

function removeUser(id) {
  activeUsers = activeUsers.filter(u => u.id !== id);
}

function getUsers() {
  return activeUsers;
}

function getUserById(id) {
  return activeUsers.find(u => u.id === id);
}

function getUserByName(name) {
  return activeUsers.find(u => u.name === name);
}

module.exports = {
  addUser,
  removeUser,
  getUsers,
  getUserById,
  getUserByName
};
