require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Sequelize adatbázis kapcsolat
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        port: 3306,
        logging: false,  // Itt javítottam a 'loging' elírást
    }
);

const models = require("../models/index")(sequelize, DataTypes); // Betöltöd az index.js-t

const db = {
    sequelize,
    Sequelize,
    ...models // A modellek beillesztése a db objektumba
};

// Inicializálás és események beállítása
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
      
        await sequelize.sync({ force: false })
            .then(() => {
                console.log('Database synchronized.');
            })
            .catch((error) => {
                console.error('Error syncing database:', error.message);
            });

            
        /*await db.Tkat.initializeTkats();

        await db.Alkat.initializeAlkats();

        await db.Tables.initializeTable();*/
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

module.exports = db;