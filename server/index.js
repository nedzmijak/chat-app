require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { initSockets } = require('./sockets');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Socket.IO server.'));

const server = http.createServer(app);
initSockets(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
