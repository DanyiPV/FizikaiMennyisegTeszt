const express = require("express");
const route = express.Router();

const profileController = require('../controllers/profileController');

route.post('/change-darkmode', profileController.changeDarkmode);

route.get('/get-darkmode', profileController.getDarkmode);

module.exports = route;