const express = require("express");
const route = express.Router();

const notifController = require('../controllers/notifContoller');

route.get('/get-notifications', notifController.getNotifications);

route.post('/shown-notification', notifController.shownNotification);

route.get('/unread-notification', notifController.unreadNotification);

route.get('/all-notification', notifController.allNotification);

route.post('/send-report', notifController.sendReport);

route.get('/get-reports', notifController.getReports);

module.exports = route;