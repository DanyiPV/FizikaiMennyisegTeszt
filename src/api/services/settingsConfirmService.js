const settingsConfirmRepository  = require("../repositories/settingsConfirmRepository");

class settingsConfirmService
{
    async setConfirmCode(newCode)
    {
        return await settingsConfirmRepository.setConfirmCode(newCode);
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

    async ProfPicUpload(id, blob,mimeType)
    {
        return await settingsConfirmRepository.ProfPicUpload(id, blob, mimeType);
    }

    async getElseUserById(id){
        return await settingsConfirmRepository.getElseUserById(id);
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

    async setNewClass(id, osztaly){
        return await settingsConfirmRepository.setNewClass(id, osztaly);
    }
}

module.exports = new settingsConfirmService();