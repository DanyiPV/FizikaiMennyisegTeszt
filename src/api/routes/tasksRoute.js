const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard, getTaskCount, getRandomTask, getTaskWithSearch, getTasksByDifficult,getTaskByThemes, getFilteredTasks} = require('../controllers/tasksController');

router.get('/get-cards-info/:offset', getCardInfo);
router.get('/get-one-card/:id',getSpecificCard)
router.get('/taskCount',getTaskCount);
router.get('/random-task',getRandomTask);
router.get('/task-with-search/:characters',getTaskWithSearch)
router.get('/task-with-difficulty/:difficulty',getTasksByDifficult)
router.get('/filter-task-by-themes/:themes', getTaskByThemes);
router.get('/filteredTasks', getFilteredTasks);
module.exports = router;
