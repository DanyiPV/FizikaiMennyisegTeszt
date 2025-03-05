const express = require("express");
const route = express.Router();

const profileController = require('../controllers/profileController');

const profileAuth = require('../middlewares/profileAuth');

route.post('/change-darkmode', profileController.changeDarkmode);

route.get('/get-user', [ profileAuth.verifyToken ], profileController.getUser);

module.exports = route;