const notifRepository  = require("../repositories/notifRepository");

class notifService
{
    async newNotif(notif)
    {
        return await notifRepository.newNotif(notif);
    }

    async getNotifs(osztaly,id)
    {
        return await notifRepository.getNotifs(osztaly, id);
    }

    async shownNotification(id,user_id){
        return await notifRepository.shownNotification(id,user_id)
    }

    async unreadNotification(id, osztaly){
        return await notifRepository.unreadNotification(id, osztaly);
    }

    async allNotification(osztaly){
        return await notifRepository.allNotification(osztaly);
    }

    async readAllNotifs(id){
        return await notifRepository.readAllNotifs(id);
    }

    async sendReport(report){
        return await notifRepository.sendReport(report);
    }

    async getReports(){
        return await notifRepository.getReports();
    }

    async readAllAdminNotifs(id){
        return await notifRepository.readAllAdminNotifs(id);
    }
}

module.exports = new notifService();