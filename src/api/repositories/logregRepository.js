const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class logregRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        //this.Tokenz = db.Tokenz;

        this.Usersettings = db.Usersettings;
    }

    async registerUser(user) {
        const newUser = await this.Users.build(user);
        
        await newUser.save();
    
        const newUserCustomization = await this.addUserCustom(newUser.id);
        
        return newUser;
    }
    
    async addUserCustom(user_id) {
        const user_custom = {
            id: null,
            darkmode: false,
            profil_picture: false,
            profPic: null,
            profType: null,
            backPic: null,
            backType: null,
            user_id: user_id,
        };

        const newUser_custom = await this.Usersettings.build(user_custom);

        await newUser_custom.save();
        
        return newUser_custom;
    }

    async checkUser(email, user_name)
    {
        try{
            const check_user = await this.Users.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { user_name: user_name }
                    ]
                }
            })

            return check_user;
        }
        catch(error){
            throw error;
        }
    }

    async uploadToken(tokenz)
    {
        const newToken = await this.Tokenz.build(tokenz);

        await newToken.save();
        
        return newToken;
    }

    async getToken(token)
    {
        return await this.Tokenz.findOne
        (
            {
                where: {
                    token: String(token),
                    type: "regisztrálás"
                }
            }
        )
    }

    async getUseridThroughToken(token)
    {
        return await this.Tokenz.findOne
        (
            {
                where: {
                    [Op.and]:{
                        token: String(token),
                        type: "regisztrálás",
                    }
                }
            }
        )
    }

    async SetNewPassword(user_id, new_password)
    {
        try {
            const user = await this.Users.findOne({
                where: {
                    id: user_id,
                }
            });
            if (!user) {
                throw new Error("Felhasználó nem található!");
            }

            user.password = new_password;
            await user.save();
    
            return { success: true, message: "Jelszó sikeresen frissítve!" };
        } catch (error) {
            console.error("Hiba történt a jelszó frissítésekor:", error);
            return { success: false, message: "Hiba történt a jelszó frissítésekor!", error };
        }
    }

    async getUser(email, id)
    {
        return await this.Users.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { id: id }
                ]
            }
        });        
    }

    async activateUser(id)
    {
        const User = await this.Users.findOne({
            where :{
                id: id
            }
        });

        User.activated = 1; 

        await User.save();

        return User.activated == 1;
    }
}

module.exports = new logregRepository(db);