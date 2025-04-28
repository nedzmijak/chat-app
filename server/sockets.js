const { Server } = require('socket.io');
const { handleAuth } = require('./auth');
const { handleMessages } = require('./messages');
const pool = require('./db');

function initSockets(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', socket => {
    console.log(` Client connected: ${socket.id}`);

    // 1) Učitaj historiju globalnih poruka
    socket.on('load_history', async () => {
      const { rows } = await pool.query(
        `SELECT username AS "user",
                text,
                recipient AS "to",
                timestamp
         FROM messages
         WHERE recipient IS NULL
         ORDER BY id ASC`
      );
      socket.emit('history', rows);
    });

    // Standardni auth i message handleri
    handleAuth(socket, io);
    handleMessages(socket, io);

    socket.on('disconnect', reason => {
      console.log(` Client disconnected: ${socket.id} (reason: ${reason})`);
    });
  });
}

module.exports = { initSockets };
