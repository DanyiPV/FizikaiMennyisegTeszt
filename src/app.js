const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./api/middlewares/errorHandler");

const db = require("./api/database/dbContext");

app.use(cors({
  origin: 'http://localhost:5173'
}));

const logregRoute = require("./api/routes/logregRoute")

const tablesRoute = require("./api/routes/tablesRoute")

const profileRoute = require("./api/routes/profileRoute")

app.use('/',logregRoute);

app.use('/',tablesRoute);

app.use('/',profileRoute);

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;