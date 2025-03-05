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


    async getUser(id)
    {
        return await this.Users.findOne({
            where :{
                id: id
            },
            include:{
                model:  this.Usersettings,
            }
        });
    }
}

module.exports = new logregRepository(db);