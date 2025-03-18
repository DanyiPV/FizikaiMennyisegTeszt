const express = require("express");
const route = express.Router();

const logregController = require('../controllers/logregController');

route.post('/register', logregController.registerUser);

route.post('/login', logregController.loginUser);

route.post("/forget-password", logregController.forgetPassword);

route.patch("/set-new-password", logregController.setNewPassword);

module.exports = route;