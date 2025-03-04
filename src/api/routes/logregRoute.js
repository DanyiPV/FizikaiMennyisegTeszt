const express = require("express");
const route = express.Router();

const logregController = require('../controllers/logregController');

route.post('/register', logregController.registerUser);

route.post('/login', logregController.loginUser);

module.exports = route;