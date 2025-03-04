require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

// Create Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false, // Set to true for debugging SQL queries
    },
);

// Import models and pass Sequelize instance
const models = require("../models/index")(sequelize, DataTypes);

// Export sequelize instance and models
const db = {
    sequelize,
    Sequelize,
    ...models,
};

// Initialize database and tables
const initializeDatabase = async () => {
    try {
        // Create the database if it does not exist
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database "${process.env.DB_NAME}" created or already exists.`);
        await connection.end();

        // Get the query interface from sequelize
        const queryInterface = sequelize.getQueryInterface();

        await sequelize.sync({ force: false });
        console.log('Database connected and models synchronized.');

        await db.Tkat.initializeTkats();

        await db.Alkat.initializeAlkats();

        await db.Tables.initializeTable();

        // Enable foreign key checks back on
        await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");

        console.log('Database connected and tables created.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};
// Run database initialization
initializeDatabase();

// Export db object for further use
module.exports = db;