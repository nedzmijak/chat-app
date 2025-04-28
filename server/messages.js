const { getUserById, getUserByName } = require('./utils/activeUsers');
const pool = require('./db');

function handleMessages(socket, io) {
  socket.on('send_message', async ({ text, to }) => {
    const fromUser = getUserById(socket.id);
    if (!fromUser) return;

    // Spremi u bazu u tabelu messages 
    await pool.query(
      `INSERT INTO messages(username, recipient, text, timestamp)
       VALUES($1, $2, $3, $4)`,
      [fromUser.name, to, text, new Date().toISOString()]
    );

    // Emit poruke svim klijentima 
    io.emit('receive_message', {
      user: fromUser.name,
      text,
      to,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('start_private', ({ to }) => {
    const fromName = getUserById(socket.id)?.name;
    if (!fromName) return;

    // notifikacija inicijatoru
    socket.emit('user_joined_private', { from: fromName });

    // notifikacija ciljanom korisniku
    const target = getUserByName(to);
    if (target) {
      io.to(target.id).emit('user_joined_private', { from: fromName });
    }
  });
}

module.exports = { handleMessages };
