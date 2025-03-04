const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./api/middlewares/errorHandler");

app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173'
}));

module.exports = app;