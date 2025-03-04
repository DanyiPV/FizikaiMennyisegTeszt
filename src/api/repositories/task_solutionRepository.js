const db = require('../database/dbContext');
const {Task_solutions,Tasks,Users} = db;
const sequelize = require('sequelize');
const tasks = require('../models/tasks');


const task_solutionRepository = {
    async getCompletionRate() {
        const result = await Task_solutions.findAll({
            attributes: [
                'task_id',
                [sequelize.fn('COUNT', sequelize.col('task_id')), 'totalTasks'],
                [
                    sequelize.fn('SUM', sequelize.literal(`CASE WHEN state = 1 THEN 1 ELSE 0 END`)),
                    'completedTasks'
                ]
            ],
            group: ['task_id']
        });
    
        return result.map(task => ({
            task_id: task.task_id,
            completionRate: (task.dataValues.completedTasks / task.dataValues.totalTasks) * 100
        }));
    },

    async getTaskState(userId) {
        return await Task_solutions.findAll({
            where: { UserId: userId },
            attributes: ['task_id', 'state']
        });
    },

    async getSolvedTasksRate(userId) {
        const totalTasks = await Task_solutions.count({ where: { UserId: userId } });
        const completedTasks = await Task_solutions.count({
            where: {
                UserId: userId,
                state: 1
            }
        });
        const completedTasksArray = await Task_solutions.findAll({
            where: {
                UserId: userId,
                state: 1
            }
        });
        
        const countpercenct = await task_solutionRepository.countByDifficulty(completedTasksArray);
        
        return {
            userId,
            totalTasks,
            completedTasks,
            completedTasksArray,
            solvedRate: (completedTasks / totalTasks) * 100,
            countpercenct
        };
    },
    
    
    async countByDifficulty(completedTasksArray) {
        const difficultyPromises = completedTasksArray.map(async (taskSolution) => {
            const task = await Tasks.findOne({
                where: { id: taskSolution.task_id },
                attributes: ['id', 'difficulty']
            });
            return task ? task.difficulty : null; 
        });
    
        const difficulties = await Promise.all(difficultyPromises);
    
        const difficultyCounts = [0, 0, 0];
    
        difficulties.forEach((difficulty) => {
            if (difficulty !== null && difficulty >= 0 && difficulty <= 2) {
                difficultyCounts[difficulty]++;
            }
        });
    
        return difficultyCounts;
    },
    async getTasksByCompletionState(state_value, userId) {
        if (state_value == 2) {
            const taskSolutions = await Task_solutions.findAll({
                attributes: ['task_id'],
                group: ['task_id']
            });

            const taskIdsInSolutions = taskSolutions.map(ts => ts.task_id);

            return await Tasks.findAll({
                limit: 15,
                where: {
                    id: {
                        [db.Sequelize.Op.notIn]: taskIdsInSolutions
                    }
                }
            });
        } else {
            const taskSolutions = await Task_solutions.findAll({
                where: {
                    state: state_value,
                    UserId: userId
                },
                attributes: ['task_id']
            });

            const taskIdsInSolutions = taskSolutions.map(ts => ts.task_id);

            return await Tasks.findAll({
                limit: 15,
                where: {
                    id: {
                        [db.Sequelize.Op.in]: taskIdsInSolutions
                    }
                }
            });
        }
    },
    async submitSolution(userId, taskId, solution) {
        try {
            const exists = await this.CheckExistance(userId, taskId);
            const state = await this.CheckSolution(taskId, solution);
    
            if (!exists) {
                console.log(`New solution submission for User: ${userId}, Task: ${taskId}, State: ${state}`);
    
                const newSolution = await Task_solutions.create({
                    UserId: userId,
                    task_id: taskId,
                    state: state
                });
    
                if (state === 1) {
                    await this.IncreaseExperiencePoints(userId, taskId);
                }
    
                return newSolution;
            } else {
                const stateChange = await this.StateChange(userId, taskId, state);
    
                if (stateChange) {
                    console.log(`Updating solution state for User: ${userId}, Task: ${taskId}, New State: ${state}`);
    
                    const [updatedRows] = await Task_solutions.update(
                        { state: state },
                        { where: { UserId: userId, task_id: taskId } }
                    );
    
                    return updatedRows > 0;
                }
            }
        } catch (error) {
            console.error("Error saving solution:", error);
            throw error;
        }
    },
    
    async CheckExistance(userId, taskId) {
        const task = await Task_solutions.findOne({
            where: { UserId: userId, task_id: taskId },
            attributes: ['task_id']
        });
        return task ? task.task_id : null;
    },
    
    async CheckSolution(taskId, solution) {
        const correctSolution = await Tasks.findOne({
            where: { id: taskId },
            attributes: ['solution']
        });
    
        if (!correctSolution) return 0;
        return solution === correctSolution.solution ? 1 : 0;
    },
    
    async StateChange(userId, taskId, state) {
        console.log(`StateChange called for User: ${userId}, Task: ${taskId}, New State: ${state}`);
    
        const prev = await Task_solutions.findOne({
            where: { UserId: userId, task_id: taskId },
            attributes: ['state']
        });
    
        console.log(`Previous state:`, prev?.state ?? "No previous solution");
    
        if (prev?.state === 1) {
            console.log("User already solved it correctly before. No XP increase.");
            return false;
        }
    
        if (state === 1) { 
            console.log("Correct solution! Increasing experience points...");
            await this.IncreaseExperiencePoints(userId, taskId);
        }
    
        return prev?.state !== state;
    },
    
    async IncreaseExperiencePoints(userId, taskId) {
        console.log(`IncreaseExperiencePoints called for User: ${userId}, Task: ${taskId}`);
    
        const exp = await this.GetExperiencePoints(taskId);
        console.log(`Experience points to add: ${exp}`);
    
        if (exp > 0) {
            await this.UpdateExperiencePoints(userId, exp);
        } else {
            console.log(`No experience points found for Task ${taskId}. Skipping XP update.`);
        }
    },
    
    async GetExperiencePoints(taskId) {
        const task = await Tasks.findOne({
            where: { id: taskId },
            attributes: ['experience_points']
        });
    
        return task ? task.experience_points : 0;
    },
    
    async UpdateExperiencePoints(userId, exp) {
        try {
            console.log(`Updating XP for User ${userId} by ${exp} points`);
    
            await Users.increment('experience_point', {
                by: exp,
                where: { id: userId }
            });
    
            console.log(`XP successfully updated for User ${userId}`);
        } catch (error) {
            console.error('Error updating experience points:', error);
        }
    }
    
    
    
    
};

module.exports = task_solutionRepository;