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
        const user = await this.Users.findOne({
            where :{
                id: id
            },
            include:{
                model:  this.Usersettings,
                attributes: ['darkmode', 'profPic']
            }
        });

        if (user && user.Usersetting && user.Usersetting.profPic) {
            const profileProfPicBuffer = user.Usersetting.profPic;
        
            const profileProfPicMimeType = user.Usersetting.profType || 'image/jpeg'; // Alapértelmezett MIME típus

            if (profileProfPicBuffer) {
                // Blob fájl átalakítása Base64 formátumba
                const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                user.Usersetting.profPic = `data:${profileProfPicMimeType};base64,${base64Image}`;
            }
        }
        
        return user;
    }
}

module.exports = new logregRepository(db);