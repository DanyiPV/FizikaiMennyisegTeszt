const { Model } = require('sequelize');
const { nullable } = require('zod');

module.exports = (sequelize, DataTypes) => {
    class Tasks extends Model {}

    Tasks.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            theme_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            solution: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            creator_id:{
                type: DataTypes.INTEGER,
                allowNull:true,
                defaultValue: nullable
            },
            difficulty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            experience_points: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            task_title: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
            task: {
                type: DataTypes.TEXT,
                allowNull: false, 
            },
        },
        {
            sequelize,
            modelName: 'Tasks',
            tableName: 'tasks',
            timestamps: false,
        }
    );
    Tasks.initializeTasks = async () => {
        const testTasks = [
            { id: 1, theme_id: 1, solution: 'x = 3', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Határozd meg x értékét: Alapvető Lineáris Egyenlet', task: 'Oldd meg x-re: $$x + 5 = 8$$' },
            { id: 2, theme_id: 1, solution: 'x = 4', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Egyszerű Egyenlet Kivonással', task: 'Oldd meg x-re: $$x - 2 = 2$$' },
            { id: 3, theme_id: 2, solution: 'x = 2', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Lineáris Egyenlet: Változó Mindkét Oldalon', task: 'Oldd meg x-re: $$2x + 4 = 8$$' },
            { id: 4, theme_id: 2, solution: 'x = -2', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Algebrai Feladat: Oldd meg x-re', task: 'Oldd meg x-re: $$3x - 6 = 0$$' },
            { id: 5, theme_id: 3, solution: 'x = 5', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Középhaladó Algebra: x Izolálása', task: 'Oldd meg x-re: $$4x - 3 = 17$$' },
            { id: 6, theme_id: 3, solution: 'x = -1', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Másodfokú Egyenlet: Szorzattá Bontás Módszere', task: 'Oldd meg x-re: $$x^2 + 2x - 3 = 0$$' },
            { id: 7, theme_id: 1, solution: 'x = 2', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Oldd meg x-re: Lineáris Egyenlet', task: 'Oldd meg x-re: $$5x - 4 = 6$$' },
            { id: 8, theme_id: 1, solution: 'x = 1', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Alapvető Algebra: Egyszerű Egyenletek Megoldása', task: 'Oldd meg x-re: $$7x + 3 = 10$$' },
            { id: 9, theme_id: 2, solution: 'x = 6', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Másodfokú Egyenlet: Tökéletes Négyzet', task: 'Oldd meg x-re: $$x^2 - 36 = 0$$' },
            { id: 10, theme_id: 2, solution: 'x = -5', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Másodfokú Egyenlet: Négyzetszám Kiegészítésével', task: 'Oldd meg x-re: $$x^2 + 10x + 25 = 0$$' },
            { id: 11, theme_id: 3, solution: 'x = 9', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Egyszerű Egyenlet: x Izolálása', task: 'Oldd meg x-re: $$x - 9 = 0$$' },
            { id: 12, theme_id: 3, solution: 'x = -3', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Lineáris Egyenlet Negatív Változóval', task: 'Oldd meg x-re: $$3x + 9 = 0$$' },
            { id: 13, theme_id: 1, solution: 'x = 1', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Alapvető Algebra: Egyszerű Megoldás', task: 'Oldd meg x-re: $$x + 0 = 1$$' },
            { id: 14, theme_id: 1, solution: 'x = 0', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Másodfokú Egyenlet: Nulla Megoldás', task: 'Oldd meg x-re: $$x^2 = 0$$' },
            { id: 15, theme_id: 2, solution: 'x = 4', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Lineáris Egyenlet Szorzással', task: 'Oldd meg x-re: $$2x + 8 = 16$$' },
            { id: 16, theme_id: 2, solution: 'x = 3', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Alapvető Lineáris Egyenlet: x Izolálása', task: 'Oldd meg x-re: $$x + 2 = 5$$' },
            { id: 17, theme_id: 3, solution: 'x = -6', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Másodfokú Egyenlet Megoldása', task: 'Oldd meg x-re: $$x^2 + 12x + 36 = 0$$' },
            { id: 18, theme_id: 3, solution: 'x = 7', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Egyszerű Algebrai Egyenlet', task: 'Oldd meg x-re: $$x + 1 = 8$$' },
            { id: 19, theme_id: 1, solution: 'x = -3', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Másodfokú Egyenlet Gyökei', task: 'Oldd meg x-re: $$x^2 + 6x + 9 = 0$$' },
            { id: 20, theme_id: 1, solution: 'x = -1', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Lineáris Egyenlet Megoldása', task: 'Oldd meg x-re: $$x + 1 = 0$$' },
            { id: 21, theme_id: 2, solution: 'x = 2', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Középhaladó Algebra: x Izolálása', task: 'Oldd meg x-re: $$4x + 2 = 10$$' },
            { id: 22, theme_id: 2, solution: 'x = -4', creator_id: null, difficulty: 1, experience_points: 20, task_title: 'Egyenlet Megoldása Negatív x-el', task: 'Oldd meg x-re: $$x - 4 = -8$$' },
            { id: 23, theme_id: 3, solution: 'x = 3', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Oldd meg a lineáris egyenletet: Változó Izolálása', task: 'Oldd meg x-re: $$2x + 1 = 7$$' },
            { id: 24, theme_id: 3, solution: 'x = 4', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Egyszerű Algebra: x Megoldása', task: 'Oldd meg x-re: $$5x - 16 = 4$$' },
            { id: 25, theme_id: 1, solution: 'x = 0', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Másodfokú Egyenlet: Zérus Megoldás', task: 'Oldd meg x-re: $$x(x - 1) = 0$$' },
            { id: 26, theme_id: 1, solution: 'x = -7', creator_id: null, difficulty: 0, experience_points: 10, task_title: 'Középhaladó Algebra: Szorzat Megoldása', task: 'Oldd meg x-re: $$x + 7 = 0$$' },
            { id: 27, theme_id: 14, solution: 'x = 1', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Lineáris Egyenlet: Megoldás Negatív Változóra', task: 'Oldd meg x-re: $$3x - 8 = -14$$' },
            { id: 28, theme_id: 14, solution: 'x = 1', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Másodfokú Egyenlet: Változó Megoldása', task: 'Oldd meg x-re: $$x^2 - 1 = 0$$' },
            { id: 29, theme_id: 15, solution: 'x = 5', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Haladó Algebra: Egyszerű Egyenlet', task: 'Oldd meg x-re: $$6x - 5 = 25$$' },
            { id: 30, theme_id: 15, solution: 'x = -2', creator_id: null, difficulty: 2, experience_points: 30, task_title: 'Középhaladó Lineáris Egyenlet Megoldása', task: 'Oldd meg x-re: $$x + 2 = 0$$' }
        ];
    
    
        await Tasks.bulkCreate(testTasks, {ignoreDuplicates: true})
    }
    return Tasks;
};
