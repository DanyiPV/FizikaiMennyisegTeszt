const express = require('express');
const router = express.Router();
const { getDailyTask } = require('../controllers/daily_taskController');
router.get('/get-daily-task/:id',getDailyTask);
module.exports = router;