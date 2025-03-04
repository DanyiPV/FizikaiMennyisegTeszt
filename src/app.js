const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./api/middleware/errorHandler");

const db = require("./api/database/dbContext");

app.use(cors({
  origin: 'http://localhost:5174'
}));

const logregRoute = require("./api/routes/logregRoute")

const tablesRoute = require("./api/routes/tablesRoute")

app.use('/',logregRoute);

app.use('/',tablesRoute);

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;