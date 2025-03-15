const db = require("../database/dbContext");

const { Op, where } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class logregRepository
{
    constructor(db)
    {
        this.Tkat = db.Tkat;

        this.Alkat = db.Alkat;

        this.Tables = db.Tables;

        this.Users = db.Users;

        this.Results = db.Results;
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

    async getRandomRows(alkatIds, sorok) {
        const rows = await this.Tables.findAll({
            where: {
                alkat_id: {
                    [Op.in]: alkatIds,
                },
            },
            order: db.sequelize.random(),
            limit: sorok,
        });
    
        return rows;
    }

    async getOsztaly(user_id) {
        return await this.Users.findOne({
            where:{
                id : user_id
            },
            attributes: ["osztaly"]
        })
    }

    async getAchivedPoints(tablak){
        var achivedPoints = 0;
        for (const item of tablak) {
            const dbData = await this.Tables.findOne({ where: { id: item.id } });
            
            if (!dbData) {
                console.warn(`Nincs találat az adatbázisban id: ${item.id}`);
                continue;
            }

            const fieldsToCheck = ['nev', 'jel', 'def', 'mer'];

            for (const field of fieldsToCheck) {
                if (typeof item[field] === 'object' && item[field] !== null) {
                    if (item[field].value === dbData[field]) {
                        achivedPoints++;
                    }
                }
            }
        }

        return achivedPoints;
    }

    async uploadResult(newResult){
        const result = await this.Results.build(newResult);

        await result.save();

        return 'OK'
    }

    async getUserResults(id){
        return await this.Results.findAll({
            where:{
                users_id: id
            }
        })
    }

    async getOsztalyok(){
        return await this.Users.findAll({
            attributes: ["osztaly"],
            distinct: true,
            where:{
                osztaly: {
                    [Op.notIn]: ['A', 'T']
                }
            }
        })
    }
}

module.exports = new logregRepository(db);