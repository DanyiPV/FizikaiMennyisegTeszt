const express = require("express");

const route = express.Router();

const contestController = require("../controllers/contestController");

route.get("/contest/leader-board", contestController.getLeaderBoard);

module.exports = route;