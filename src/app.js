const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const errorHandler = require("./api/middlewares/errorHandler");

const db = require("./api/database/dbContext");

const logregRoute = require("./api/routes/logregRoute")

const tablesRoute = require("./api/routes/tablesRoute")

const profileRoute = require("./api/routes/profileRoute")

const settingsConfirmRoute = require("./api/routes/settingsConfirmRoute")

const notifRoute = require("./api/routes/notifRoute")

const newPasswordRoute = require("./api/routes/newPasswordRoute")

const allowedOrigins = [
  'http://localhost:5173',       // fejlesztés
  'https://localhost',          // production
  'http://gravitas-ckik.cloud',
  'http://www.gravitas-ckik.cloud'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/',logregRoute);

app.use('/',tablesRoute);

app.use('/',profileRoute);

app.use('/',settingsConfirmRoute);

app.use('/',notifRoute);

app.use('/',newPasswordRoute);

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

const server = http.createServer(app);

// Socket.IO szerver indítása
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://gravitas-ckik.cloud',
      'http://www.gravitas-ckik.cloud',
      'https://localhost', 
    ],
    credentials: true,
  }
});

// Socket események
io.on("connection", (socket) => {

  // Szoba csatlakozás
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
  });

  // Értesítés küldése adott szobába
  socket.on("send_notification", ({ room, message, id, type }) => {
    socket.broadcast.to(room).emit("receive_notification", {message, id, type});
  });

  socket.on("disconnect", () => {
  });
});

// HTTP szerver indítása
server.listen(3001, () => {
});

module.exports = app;