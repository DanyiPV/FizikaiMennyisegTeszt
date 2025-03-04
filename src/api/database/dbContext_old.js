require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const { 
    Users, 
    Community_comments, 
    Community_posts,
    Community_files,
    Community_likes,
    Community_tags,
    Themes, 
    Tasks, 
    Competitions, 
    Competitions_types, 
    Badges, 
    Alerts, 
    Tokenz, 
    User_customization, 
    Task_solutions,
    Daily_Tasks,
    Notification,
    Advertisement_Cards,
    DailyQuote
} = require("../models")(sequelize, DataTypes);

db.Users = Users;
db.Community_posts = Community_posts;
db.Community_comments = Community_comments;
db.Community_files = Community_files;
db.Community_likes = Community_likes;
db.Community_tags = Community_tags;
db.Themes = Themes;
db.Tasks = Tasks;
db.Competitions = Competitions;
db.Competitions_types = Competitions_types;
db.Badges = Badges;
db.Alerts = Alerts;
db.Tokenz = Tokenz;
db.User_customization = User_customization;
db.Task_solutions = Task_solutions; // Assign Task_solutions to db
db.Daily_Tasks = Daily_Tasks;
db.Notification = Notification;
db.Advertisement_Cards = Advertisement_Cards;
db.DailyQuote = DailyQuote;

// Initialize database and themes
const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database "${process.env.DB_NAME}" created or already exists.`);
        await connection.end();

        await sequelize.sync({ alter: false });
        console.log('Database connected and models synchronized.');

        await db.Themes.initializeThemes();
        console.log('Default themes inserted.');

        await db.Daily_Tasks.initializeDailyQuote()
        console.log('Daily task table added')

        await db.Tasks.initializeTasks();
        console.log('Default tasks inserted.');
        
        await db.Community_tags.initializeTags();
        console.log('Default tags inserted.');

        await sequelize.query('SET GLOBAL event_scheduler = ON;');
        console.log("Event Scheduler is enabled.");

        const createEventQuery = `
            CREATE EVENT IF NOT EXISTS delete_expired_tokens
            ON SCHEDULE EVERY 10 SECOND
            DO
                DELETE FROM Tokenz
                WHERE expires <= DATE_SUB(NOW(), INTERVAL 1 HOUR) AND type = 'regisztrálás';`;

        await sequelize.query(createEventQuery);
        console.log('Event for automatic token deletion created.');
        
        const createConfDeleteEventQuery = `
            CREATE EVENT IF NOT EXISTS delete_expired_confirm_tokens
            ON SCHEDULE EVERY 10 SECOND
            DO
                DELETE FROM Tokenz
                WHERE expires <= DATE_SUB(NOW(), INTERVAL 15 MINUTE) AND type = 'beállítások';`;

        await sequelize.query(createConfDeleteEventQuery);
        console.log('Event for automatic confirm token deletion created.');

        const createTriggerQuery = `
            CREATE TRIGGER IF NOT EXISTS delete_user_when_token_deleted
            AFTER DELETE ON Tokenz
            FOR EACH ROW
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM Tokenz WHERE user_id = OLD.user_id
                ) AND EXISTS (
                    SELECT 1 FROM Users WHERE id = OLD.user_id AND activated = 0
                ) THEN
                    DELETE FROM Users WHERE id = OLD.user_id;
                END IF;
            END;`;

        await sequelize.query(createTriggerQuery);
        console.log('Trigger for user deletion created.');

        const createDailyTaskEventQuery = `
            CREATE EVENT IF NOT EXISTS daily_task_event
            ON SCHEDULE EVERY 1 DAY
            STARTS TIMESTAMP(CURRENT_DATE) -- Holnaptól indul
            DO
            BEGIN
                -- Ellenőrzés, hogy a hónap első napja van-e
                IF DAY(CURRENT_DATE) = 1 THEN
                    DELETE FROM Daily_Tasks;
                END IF;

                -- Ha az adott napi id már létezik, akkor nem csinál semmit
                IF NOT EXISTS (SELECT 1 FROM Daily_Tasks WHERE id = DAY(CURRENT_DATE)) THEN
                    -- Új random task hozzáadása az aktuális nap id-jával
                    INSERT INTO Daily_Tasks (id, task_id)
                    SELECT 
                        DAY(CURRENT_DATE) AS id,  -- Az aktuális nap sorszáma
                        (SELECT id FROM Tasks ORDER BY RAND() LIMIT 1) AS task_id; -- Véletlenszerű task kiválasztása
                END IF;
            END;
        `;

        await sequelize.query(createDailyTaskEventQuery);
        console.log('Daily event for tasks created.');

    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

module.exports = db;
