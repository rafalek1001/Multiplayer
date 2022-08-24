// Tworzenie Servera
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 4000;

app.use(express.static(
  path.join(__dirname, "/")
));

io.on('connection', (socket) => { // Połączenie socketa
  socket.on('joinGame', (data) => { // Dołączanie do gry
    socket.playerName = data.playerName;
    console.log(`Gracz ${data.playerName} dołączył do gry.`);
  });

  socket.on('disconnect', () => { // Opuszczanie gry
    console.log(`Gracz ${socket.playerName} wyszedł z gry.`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});