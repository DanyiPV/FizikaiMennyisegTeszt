const db = require("../database/dbContext");

const { Op } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class logregRepository
{
    constructor(db)
    {
        this.Users = db.Users;

        this.Usersettings = db.Usersettings;

        this.Validation = db.Validation;
    }

    async setConfirmCode(newCode){
        const existingCode = await this.Validation.findOne({
            where: { user_id: newCode.user_id, type: 1 }
        });

        if (existingCode) {
            existingCode.token = newCode.token;
            await existingCode.save();
            return existingCode;
        }

        return await this.Validation.create(newCode);
    }

    async codeConfirm(code, id){
        const CodeChecker =  await this.Validation.findOne({
            where: { 
                code: code,
                user_id: id,
            }
        });

        return CodeChecker;
    }

    async setNewUsername(id,content){
        const user =  await this.Users.update(
        { 
            user_name: content 
        }, 
        {
            where: {
                id: id,
            }
        });

        return content;
    }

    async setNewGmail(id,content){
        const user =  await this.Users.update(
        { 
            email: content 
        }, 
        {
            where: {
                id: id,
            }
        });

        return content;
    }

    async setNewPassword(id,content){
        const user =  await this.Users.update(
        { 
            password: content
        }, 
        {
            where: {
                id: id,
            }
        });

        return content;
    }

    async ProfPicUpload(id, blob, mimeType)
    {
        const user = await this.Usersettings.findOne({
            where: {
                user_id: id,
            }
        });
        if (!user) {
            throw new Error("Felhasználó nem található!");
        }
        user.profPic = blob;
        user.profType = mimeType;

        await user.save();

        return "Profilkép sikeresen frissítve!";
    }

    async getElseUserById(id){
        const user = await this.Users.findOne(
        {
            where: {
                id: id,
            }
        });
    
        return user.admin == 1;
    }

    async getALlUser(name, activated_type, admin) {
        const whereClause = {};
    
        if (name) {
            whereClause.user_name = { [Sequelize.Op.like]: `%${name}%` };
        }
    
        if (activated_type == 0 || activated_type == 2) {
            whereClause.activated = activated_type;
        }
    
        if (admin) {
            if(admin == 'A'){
                whereClause.admin = 1;
            }else if(admin == 'T'){
                whereClause.osztaly = "T";
            }
        }
    
        const users = await this.Users.findAll(
            { 
                where: whereClause,
                include: [
                    {
                        model: this.Usersettings,
                        attributes: ["profPic"],
                    },
                ],
            }
        );

        users.forEach(user =>{
            if (user && user.Usersetting && user.Usersetting.profPic) {
                const profileProfPicBuffer = user.Usersetting.profPic;
            
                const profileProfPicMimeType = user.Usersetting.profType || 'image/jpeg'; // Alapértelmezett MIME típus
    
                if (profileProfPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    user.Usersetting.profPic = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }
        });

        return users;
    }

    
    async setUserSettings(content, id, type){
        const user = await this.Users.findOne({
            where:{
                id: id
            }
        });

        if(type == 1){
            user.user_name = content;
        }
        else if(type == 2){
            user.email = content;
        }
        else if(type == 3){
            user.password = await bcrypt.hash(content, salt);
        }

        user.save();

        return type == 3 ? user.password : content;
    }
    
    async setUserRoles(id, type){
        const user = await this.Users.findOne({
            where:{
                id: id
            }
        });

        if(type == 1){
            user.activated = 1;
        }
        else if(type == 2){
            user.user_role = 'banned';
            user.activated = 2;
            user.admin = 0;
        }
        else if(type == 3){
            user.user_role = 'student';
            user.activated = 1;
            user.osztaly = null;
            user.admin = 0;
        }
        else if(type == 4){
            user.user_role = 'admin';
            user.osztaly = 'A';
            user.admin = 1;
        }
        else if(type == 5){
            user.user_role = 'student';
            user.osztaly = null;
            user.admin = 0;
        }
        else if(type == 6){
            user.user_role = 'teacher';
            user.osztaly = 'T';
            user.activated = 1;
            user.admin = 0;
        }

        user.save();

        return 'OK'
    }

    async setNewClass(id, osztaly){
        const user =  await this.Users.update(
        { 
            osztaly: osztaly
        }, 
        {
            where: {
                id: id,
            }
        });
    
        return osztaly;
    }
}

module.exports = new logregRepository(db);