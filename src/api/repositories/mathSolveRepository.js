const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class mahtSolveRepository
{
    async getUsers()
    {
        return await this.Users.findAll();
    }
}

module.exports = new mahtSolveRepository(db);