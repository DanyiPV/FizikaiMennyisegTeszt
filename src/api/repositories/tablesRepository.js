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
        var SubcategoriesArray = [];

        for (const id of idList) {
            const subcategories = await this.Alkat.findAll({
                where: {
                    tkat_id: id
                },
                include: [
                    {
                        model: this.Tables, // A Tables modell kapcsolata
                        attributes: [] // Nem kérjük le a konkrét adatokat, csak a darabszám kell
                    }
                ],
                attributes: [
                    'id', 'nev', 'tkat_id',
                    [Sequelize.fn('COUNT', Sequelize.col('Tables.id')), 'tablesCount'] // Összeszámolja a kapcsolódó Tables bejegyzéseket
                ],
                group: ['Alkat.id'] // Csoportosítás az Alkat id alapján, hogy a COUNT jól működjön
            });
        
            SubcategoriesArray.push(subcategories);
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