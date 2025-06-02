require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        port: 3306,
        logging: false,
    }
);

const models = require("../models/index")(sequelize, DataTypes);

const db = {
    sequelize,
    Sequelize,
    ...models
};

const initializeDatabase = async () => {
    try {
        console.log("\n--- Új log ---");
        console.log('Starting database authentication...');

        await sequelize.authenticate()
        .then(() => {
            console.log('Database connected successfully.');
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error.message);
        });
      
        await sequelize.sync({ force: true })
        .then(() => {
            console.log('Database synchronized.');
        })
        .catch((error) => {
            console.error('Error syncing database:', error.message);
        });

            
        await db.Tkat.initializeTkats();

        await db.Alkat.initializeAlkats();

        await db.Tables.initializeTable();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

module.exports = db;