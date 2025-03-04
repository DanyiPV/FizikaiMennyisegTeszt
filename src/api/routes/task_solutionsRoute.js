const express = require('express');
const router = express.Router();
const { getTaskState,getCompletionRate,getSolvedTasksRate,getTasksByCompletionState,submitSolution } = require('../controllers/task_solutionsController');
const { verifyToken } = require("../middlewares/profileAuth");

router.get('/taskState/:id', getTaskState);
router.get('/tasks/task-completion-rates', getCompletionRate);
router.get('/solved-tasks-rate/:id', getSolvedTasksRate);
router.get('/task-by-completion-state/:state/:userId', getTasksByCompletionState);
router.post("/submit-solution/:data", submitSolution); 
module.exports = router;
