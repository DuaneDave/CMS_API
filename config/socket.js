const express = require('express');
const app = express();
const socketio = require('socket.io');
const httpServer = require('http').createServer(app);
const io = socketio(httpServer);

const handleConnection = () => {
  return {
    io,
    app,
    adminNamespace: io.of('/api/v1/admin'),
    httpServer,
  };
};

module.exports = handleConnection;
