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
    
} = require("../models")(sequelize, DataTypes);

//db.Users = Users;

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

        await sequelize.sync({ force: true });
        console.log('Database connected and models synchronized.');

    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

module.exports = db;
