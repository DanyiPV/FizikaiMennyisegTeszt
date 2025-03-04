
const cron = require('node-cron');
const dailyTasksService = require('../services/dailyTasksService');

cron.schedule('* * * * *', async () => {
    console.log('Scheduler running every minute');
    await dailyTasksService.assignDailyTasks();
});

  