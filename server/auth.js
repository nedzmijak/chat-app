const { addUser, removeUser, getUsers } = require('./utils/activeUsers');

function handleAuth(socket, io) {
  const username = 'User' + Math.floor(Math.random() * 1000);
  console.log(`New user assigned: ${username} (socket: ${socket.id})`);

  addUser({ id: socket.id, name: username });

  // Send the assigned username to the connecting client
  socket.emit('your_username', username);

  // Broadcast a system message announcing the new user in the global chat
  io.emit('receive_message', {
    user: '📢 Sistem',
    text: `${username} se priključio.`,
    to: null,
    timestamp: new Date().toISOString()
  });

  // Update all clients with the current active user list
  io.emit('user_list', getUsers());

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`Removing user: ${username} (socket: ${socket.id})`);

    // Broadcast a system message announcing the user left
    io.emit('receive_message', {
      user: '📢 Sistem',
      text: `${username} je napustio chat.`,
      to: null,
      timestamp: new Date().toISOString()
    });

    // Remove from active user list and broadcast update
    removeUser(socket.id);
    io.emit('user_list', getUsers());
  });
}

module.exports = { handleAuth };
