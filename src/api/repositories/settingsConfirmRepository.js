const db = require("../database/dbContext");

const { Op, where } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

const bcrypt = require("bcrypt");

const salt = 10;

class settingsConfirmRepository
{
    constructor(db)
    {
        this.Tokenz = db.Tokenz;

        this.Users = db.Users;

        this.User_customization = db.User_customization;

        this.Community_posts = db.Community_posts;

        this.Community_files = db.Community_files;
  
        this.Community_comments = db.Community_comments;

        this.Community_tags = db.Community_tags;

        this.Notification = db.Notification;
    }

    async setConfirmCode(token) {
        const existingToken = await this.Tokenz.findOne({
            where: { user_id: token.user_id }
        });
    
        if (existingToken) {
            // Ha az új token ugyanaz, de más mező változna (pl. expires), töröljük és újat hozunk létre
            if (existingToken.expires !== token.expires) {
                await existingToken.destroy();
                return await this.Tokenz.create(token);
            }
    
            // Ha csak a "token" mezőt kell módosítani, akkor frissítjük
            existingToken.token = token.token;
            await existingToken.save();
            return existingToken;
        }
    
        // Ha nincs még ilyen user_id, akkor új rekordot hozunk létre
        return await this.Tokenz.create(token);
    }

    async codeConfirm(code, id){
        const CodeChecker =  await this.Tokenz.findOne({
            where: { 
                token: code,
                user_id: id,
                type: 'beállítások'
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

    async getElseUserById(id){
        const user =  await this.Users.findOne(
        {
            where: {
                id: id,
            }
        });
    
        return user.admin == 1;
    }

    async getReports() {
        const reports = await this.Notification.findAll({
            include: [
                {
                    model: this.Users,
                    as: "Reporter",
                    attributes: ["id", "user_name", "user_role"],
                    include: [
                        {
                            model: this.User_customization,
                            attributes: ["profil_picture"],
                        },
                    ],
                },
                {
                    model: this.Users,
                    as: "ReportedUser",
                    attributes: ["id", "user_name", "user_role"],
                    include: [
                        {
                            model: this.User_customization,
                            attributes: ["profil_picture"],
                        },
                    ],
                },
                {
                    model: this.Community_posts,
                    as: "reportedPost",
                    required: false,
                    where: Sequelize.literal("`Notification`.`content_type` = 1"), // MariaDB-ben `true` helyett `1`
                    include: [
                        {
                            model: this.Community_files,
                        },
                        {
                            model: this.Community_tags,
                        },
                    ]
                },
                {
                    model: this.Community_comments,
                    as: "reportedComment",
                    required: false,
                    where: Sequelize.literal("`Notification`.`content_type` = 0"), // MariaDB-ben `false` helyett `0`
                },
            ],
            where: {
                closed: false
            }
        });

        const reportObjects = await Promise.all(reports.map(async (reportObj) => {
            const postObj = reportObj.reportedPost;
            if(reportObj.reportedPost){
                postObj.images = [];
                postObj.files = [];
    
                if (postObj.Community_files && postObj.Community_files.length > 0) {
                    postObj.Community_files.forEach(file => {
                    const fileBuffer = file.file;
                    const mimeType = file.file_type || 'application/octet-stream';
                
                    const base64File = Buffer.from(fileBuffer).toString('base64');
                    const base64Data = `data:${mimeType};base64,${base64File}`;
        
                    if (mimeType === 'image/gif' && !base64File.startsWith('R0lGOD')) {
                        return; // Hibás GIF kihagyása
                    }
        
                    if (mimeType.startsWith('image/')) {
                        postObj.images.push({
                        ...file,
                        file: base64Data,
                        name: file.file_name,
                        id: file.id
                        });
                    } else {
                        postObj.files.push({
                        ...file,
                        file: base64Data,
                        name: file.file_name,
                        id: file.id
                        });
                    }
                    });
                }
    
                const FinalPost = {
                    id: postObj.id,
                    title: postObj.title,
                    content: postObj.content,
                    createdAt: postObj.createdAt,
                    user_id: postObj.user_id,
                    files: postObj.files,
                    images: postObj.images,
                    gotEdit: postObj.gotEdit,
                    files: postObj.files,
                    tags: postObj.Community_tags.map(tag => tag.tag),
                }

                reportObj.setDataValue("reportedPost", FinalPost);
            }

            if (reportObj.Reporter.User_customization.profil_picture != null) {
                const profileProfPicBuffer = reportObj.Reporter.User_customization.profil_picture;
                
                const profileProfPicMimeType = reportObj.Reporter.User_customization.profil_picture_type || 'image/jpeg';
                
                if (profileProfPicBuffer) {
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    reportObj.Reporter.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }
    
            if (reportObj.ReportedUser.User_customization.profil_picture != null) {
                const profileProfPicBuffer = reportObj.ReportedUser.User_customization.profil_picture;
                
                const profileProfPicMimeType = reportObj.ReportedUser.User_customization.profil_picture_type || 'image/jpeg';
                
                if (profileProfPicBuffer) {
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    reportObj.ReportedUser.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }

            return reportObj
        }));


        return reportObjects;
    }  
    
    async closeReport(id){
        return await this.Notification.update({
            closed : true
        },
        {
            where:{
                id: id
            }
        }
        );
    }
    
    async deleteContent(content_id, content_type) {
        let content;
        try {
            if (content_type) {
                content = await this.Community_posts.findOne({ where: { id: content_id } });
            } else {
                content = await this.Community_comments.findOne({ where: { id: content_id } });
            }
    
            if (!content) {
                return { success: false, message: "Content not found." };
            }
    
            const result = await content.destroy();
    
            return { success: true, message: "Content deleted successfully.", result };
        } catch (error) {
            return { success: false, message: "Error deleting content.", error };
        }
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
            whereClause.admin = admin;
        }
    
        const users = await this.Users.findAll(
            { 
                where: whereClause,
                include: [
                    {
                        model: this.User_customization,
                        attributes: ["profil_picture"],
                    },
                ],
            }
        );

        users.forEach(user =>{
            if (user.User_customization.profil_picture != null) {
                const profileProfPicBuffer = user.User_customization.profil_picture;
                
                const profileProfPicMimeType = user.User_customization.profil_picture_type || 'image/jpeg';
                
                if (profileProfPicBuffer) {
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    user.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
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
            user.user_role = 'member';
            user.activated = 1;
            user.admin = 0;
        }
        else if(type == 4){
            user.user_role = 'admin';
            user.admin = 1;
        }
        else if(type == 5){
            user.user_role = 'member';
            user.admin = 0;
        }

        user.save();

        return 'OK'
    }

    async getAllNotifs(id){
        const notifs = await this.Notification.findAll({
            where: {
                user_id: id,
                type: 0
            },
            include: [
                {
                    model: this.Users,
                    as: "ReportedUser",
                    attributes: ["id","user_name"],
                    include: [
                        {
                            model: this.User_customization,
                            attributes: ["profil_picture"],
                        },
                    ],
                },
            ],
        });
        
        notifs.forEach(notif =>{
            if (notif.ReportedUser.User_customization.profil_picture != null) {
                const profileProfPicBuffer = notif.ReportedUser.User_customization.profil_picture;
                
                const profileProfPicMimeType = notif.ReportedUser.User_customization.profil_picture_type || 'image/jpeg';
                
                if (profileProfPicBuffer) {
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    notif.ReportedUser.User_customization.profil_picture = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }
        });

        return notifs;
    }
}

module.exports = new settingsConfirmRepository(db);