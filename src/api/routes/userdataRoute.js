const express = require('express');
const router = express.Router();
const {getUserData} = require('../controllers/userdataController');
router.get('/mainpage', getUserData);

module.exports = router;