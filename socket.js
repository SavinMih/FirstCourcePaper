const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const cors = require('cors');

let messages = []

const corsOptions = {
  cors: {
    origin: require("./config.json").cors,
    methods: ["GET", "POST"]
  }
};

const app = express();
app.use(cors(corsOptions)); // Разрешает запросы только от http://localhost:8080
const server = http.createServer(app);
const io = socketIo(server, corsOptions);

io.on('connection', (socket) => {
  io.emit('history', messages);

  console.log('A user connected');

  socket.on('message', (message) => {
    messages.push(message)
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});