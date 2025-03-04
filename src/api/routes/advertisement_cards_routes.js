const express = require('express');
const router = express.Router();
const { getAds } = require("../controllers/advertisement_cards_controller.js");

router.get('/get-ads-for-mainpage',getAds)
module.exports = router;