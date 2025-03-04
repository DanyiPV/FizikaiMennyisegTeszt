const db = require("../database/dbContext");

const { Op, where } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class contestRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.User_customization = db.User_customization;
    }

    async getLeaderBoard()
    {
        const userWithCustomization = await this.Users.findAll({
            order: [['experience_point', 'DESC']],
            limit: 10,
            include: [{
                model: this.User_customization,
                required: true,
            }],
            where:{
                activated: 1
            }
        });

        const UsersOnLeaderboard = [];

        var baseXP = 10;

        const experienceForNextLevel = () => {
            return baseXP * 5;
        };
        
        const totalXPForLevel = (level) => {
            let totalXP = 0;
            for (let i = 1; i < level; i++) {
                totalXP += experienceForNextLevel(i);
            }
            return totalXP;
        };
        
        const calculateLevel = (xp) => {
            let level = 1;
            while (xp >= totalXPForLevel(level + 1)) {
                level++;
            }
            return level;
        };
        
        userWithCustomization.forEach(user => {
            if (user && user.User_customization) {
                const profileProfPicBuffer = user.User_customization.profil_picture;
                const profileProfPicMimeType = user.User_customization.profil_picture_type || 'image/jpeg';
                if (profileProfPicBuffer) {
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    user.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }
        
            // Szint kiszámítása experience_point alapján
            const userLevel = calculateLevel(user.experience_point || 0);
        
            UsersOnLeaderboard.push({
                id: user.id,
                name: user.user_name,
                profil_picture: user.User_customization.profil_picture,
                level: userLevel // Itt az experience_point helyett a szintet adjuk meg
            });
        });        

        return UsersOnLeaderboard;
    }
}

module.exports = new contestRepository(db);