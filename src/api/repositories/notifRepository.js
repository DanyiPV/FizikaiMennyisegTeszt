const db = require("../database/dbContext");

const { Op, where } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class notifRepository
{
    constructor(db)
    {
        this.Notification = db.Notification;

        this.UserNotification = db.UserNotification;

        this.Users = db.Users;

        this.Usersettings = db.Usersettings;
    }

    async newNotif(notif){
        const new_notif = await this.Notification.build(notif);

        await new_notif.save();

        return "OK";
    }

    async getNotifs(osztaly, userId) {
        // 1. Lekérjük a felhasználót
        const user = await this.Users.findOne({
            where: { id: userId },
            attributes: ['user_role', 'admin', 'osztaly']
        });

        // 2. Meghatározzuk a notification típusokat
        let typesToInclude = [0];
        if (
            user &&
            user.user_role === 'admin' &&
            user.admin === true &&
            osztaly === 'A'
        ) {
            typesToInclude = [0, 1];
        }

        // 3. Notification lekérdezés
        return await this.Notification.findAll({
            where: {
                osztaly,
                type: typesToInclude
            },
            include: [{
                model: this.Users,
                as: 'users',
                required: false,
                where: {
                    id: userId
                },
                attributes: [],
                through: {
                    attributes: []
                }
            }],
            having: Sequelize.literal('COUNT(`users`.`id`) = 0'),
            group: ['id']
        });
    }


    async shownNotification(id,user_id){
        const new_shownNotif = await this.UserNotification.build({id: null, notification_id: id, user_id, status: 'shown'});

        await new_shownNotif.save();

        return 'OK'
    }

    async unreadNotification(id, osztaly){
        const unread = await this.UserNotification.count({
            where: {
                status: 'shown',
                user_id: id
            },
            include: [{
                model: this.Notification,
                as: 'notification',
                where: {
                    type: 0
                }
            }]
        });

        const unseen = await this.Notification.findAll({
            where: {
                osztaly,
                type: 0
            },
            include: [{
                model: this.Users,
                as: 'users',
                required: false,
                where: { id },
                attributes: [],
                through: { attributes: [] }
            }],
            having: Sequelize.literal('COUNT(`users`.`id`) = 0'),
            group: ['id']
        });

        const user = await this.Users.findOne({
            where: { id: id },
            attributes: ['user_role', 'admin', 'osztaly']
        });

        var admin = 0;

       if (
            user &&
            user.user_role === 'admin' &&
            user.admin === true &&
            osztaly === 'A'
        ) {
            const noUserCount = await this.Notification.findAll({
                where: {
                    osztaly,
                    type: 1
                },
                include: [{
                    model: this.Users,
                    as: 'users',
                    required: false,
                    where: { id },
                    attributes: [],
                    through: { attributes: [] }
                }],
                having: Sequelize.literal('COUNT(`users`.`id`) = 0'),
                group: ['id']
            });

            const shownCount = await this.UserNotification.count({
                where: {
                    status: 'shown',
                    user_id: id
                },
                include: [{
                    model: this.Notification,
                    as: 'notification',
                    where: {
                        type: 1
                    }
                }]
            });

            admin = Number(noUserCount.length) + Number(shownCount);
        }


        return {normal: Number(unread) + Number(unseen.length), admin};
    }

    async allNotification(osztaly){
        const notifs = await this.Notification.findAll({
            where:{
                osztaly,
                type: 0
            },
            include: [{
                model: this.Users,
                attributes:['user_name'],
                include:{
                    model: this.Usersettings,
                    attributes:['profPic','profType']
                }
            }],
            order: [['id', 'DESC']]
        })

        for (const elem of notifs) {
            var user = elem.User;
            if (user && user.Usersetting && user.Usersetting.profPic) {
                const profileProfPicBuffer = user.Usersetting.profPic;
            
                const profileProfPicMimeType = user.Usersetting.profType || 'image/jpeg';

                if (profileProfPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    elem.User.Usersetting.profPic = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }
        }

        return notifs;
    }

    async readAllNotifs(id) {
        const unreadNotifs = await this.UserNotification.findAll({
            where: {
                user_id: id,
                status: 'shown'
            },
            include: [{
                model: this.Notification,
                as: 'notification',    // az asszociáció aliasának megfelelően
                where: { type: 0 }
            }]
        });

        for (const elem of unreadNotifs) {
            elem.status = 'read';
            await elem.save();
        }

        return 'OK';
    }

    async sendReport(report){
        const new_report = await this.Notification.build(report);

        new_report.save();

        return new_report.id;
    }

    async getReports(){
        const notifs = await this.Notification.findAll({
            where:{
                osztaly: 'A',
                type: 1
            },
            include: [{
                model: this.Users,
                attributes:['user_name'],
                include:{
                    model: this.Usersettings,
                    attributes:['profPic','profType']
                }
            }],
            order: [['id', 'DESC']]
        })

        for (const elem of notifs) {
            var user = elem.User;
            if (user && user.Usersetting && user.Usersetting.profPic) {
                const profileProfPicBuffer = user.Usersetting.profPic;
            
                const profileProfPicMimeType = user.Usersetting.profType || 'image/jpeg';

                if (profileProfPicBuffer) {
                    // Blob fájl átalakítása Base64 formátumba
                    const base64Image = Buffer.from(profileProfPicBuffer).toString('base64');
                    elem.User.Usersetting.profPic = `data:${profileProfPicMimeType};base64,${base64Image}`;
                }
            }
        }

        return notifs;
    }

    async readAllAdminNotifs(id){
        const unreadNotifs = await this.UserNotification.findAll({
            where: {
                user_id: id,
                status: 'shown'
            },
            include: [{
                model: this.Notification,
                as: 'notification',
                where: { type: 1 }
            }]
        });

        for (const elem of unreadNotifs) {
            elem.status = 'read';
            await elem.save();
        }

        return 'OK';
    }
}

module.exports = new notifRepository(db);