const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./api/middlewares/errorHandler");

const db = require("./api/database/dbContext");

app.use(cors({
  origin: "*",
}));

const logregRoute = require("./api/routes/logregRoute")

const tablesRoute = require("./api/routes/tablesRoute")

const profileRoute = require("./api/routes/profileRoute")

const settingsConfirmRoute = require("./api/routes/settingsConfirmRoute")

app.use('/',logregRoute);

app.use('/',tablesRoute);

app.use('/',profileRoute);

app.use('/',settingsConfirmRoute);

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;