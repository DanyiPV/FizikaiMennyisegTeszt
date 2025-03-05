const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class logregRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.Usersettings = db.Usersettings;
    }

    async changeDarkmode(id,type)
    {
        const Usersetting = await this.Usersettings.findOne({
            where :{
                user_id: id
            }
        });
    
        Usersetting.darkmode = type; 

        Usersetting.save();

        return 'OK';
    }

    async getDarkmode(id)
    {
        return await this.Usersettings.findOne({
            where :{
                user_id: id
            },
            attributes:['darkmode']
        });
    }
}

module.exports = new logregRepository(db);