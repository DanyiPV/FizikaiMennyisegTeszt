const settingsConfirmRepository  = require("../repositories/settingsConfirmRepository");

class settingsConfirmService
{
    async setConfirmCode(token)
    {
        return await settingsConfirmRepository.setConfirmCode(token);
    }

    async codeConfirm(code, id){
        return await settingsConfirmRepository.codeConfirm(code, id);
    }

    async setNewUsername(id,content){
        return await settingsConfirmRepository.setNewUsername(id,content);
    }

    async setNewGmail(id,content){
        return await settingsConfirmRepository.setNewGmail(id,content);
    }

    async setNewPassword(id,content){
        return await settingsConfirmRepository.setNewPassword(id,content);
    }

    async getElseUserById(id){
        return await settingsConfirmRepository.getElseUserById(id);
    }

    async getReports(){
        return await settingsConfirmRepository.getReports();
    }

    async closeReport(id){
        return await settingsConfirmRepository.closeReport(id);
    }

    async deleteContent(content_id, content_type){
        return await settingsConfirmRepository.deleteContent(content_id, content_type);
    }
    
    async getALlUser(name, activated_type, admin){
        return await settingsConfirmRepository.getALlUser(name, activated_type, admin);
    }

    async setUserSettings(content, id, type){
        return await settingsConfirmRepository.setUserSettings(content, id, type);
    }

    async setUserRoles(id, type){
        return await settingsConfirmRepository.setUserRoles(id, type);
    }

    async getAllNotifs(id){
        return await settingsConfirmRepository.getAllNotifs(id);
    }
}

module.exports = new settingsConfirmService();