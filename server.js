const express = require('express');
const http = require('http');
const socketManager = require('./src/logic/socket-manager');

const app = express();
const httpServer = http.Server(app);

const PORT = 3000;

app.use(express.static('public'));
httpServer.listen(PORT, () => {
    console.log(`Tic-Tac-Toe game server running on port ${PORT}`);
});

const io = require('socket.io')(httpServer);
socketManager.init(io);
