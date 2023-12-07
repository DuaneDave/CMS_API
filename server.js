const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const socketio = require('socket.io');

const errorMiddleware = require('./middlewares/errors');
const corsOptions = require('./config/origin');
const connectDatabase = require('./config/database');
const api = require('./routes/api.routes');
const handleConnection = require('./config/socket');

const { io, app, adminNamespace, httpServer } = handleConnection();

dotenv.config();
connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions()));

app.use('/api/v1', api);
adminNamespace.on('connection', (socket) => {
  corsOptions.origin = socket.handshake.headers.origin;

  console.log('connected');
});
app.use(errorMiddleware);

process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Uncaught Exception');

  process.exit(1);
});

const server = httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 3000}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');

  server.close(() => process.exit(1));
});

module.exports = io;
