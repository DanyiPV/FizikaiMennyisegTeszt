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

    async fullSubcategories(idList){
        console.log(idList);
        var SubcategoriesArray = [];

        for(const id of idList){
           SubcategoriesArray.push(await this.Alkat.findAll(
                {
                    where:{
                        tkat_id: id
                    }
                }
            ))
        }

        return SubcategoriesArray;
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
        return await this.Tkat.findAll({
            include:{
                model: this.Alkat,
                include:{
                    model: this.Tables,
                }
            }
        });
    }
}

module.exports = new logregRepository(db);