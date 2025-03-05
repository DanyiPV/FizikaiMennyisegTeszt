const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class logregRepository
{
    constructor(db)
    {
        this.Tkat = db.Tkat;

        this.Alkat = db.Alkat;

        this.Tables = db.Tables;
    }

    async fullCategories() {
        return await this.Tkat.findAll();
    }

    async fullSubcategories(id){
        return await this.Alkat.findAll(
            {
                where:{
                    tkat_id: id
                }
            }
        )
    }

    async fullTables(id){
        return await this.Tables.findAll(
            {
                where:{
                    alkat_id: id
                }
            }
        )
    }

    async allTables(){
        return await this.Tables.findAll();
    }
}

module.exports = new logregRepository(db);