const profileRepository  = require("../repositories/profileRepository");

class porfileService
{
    async changeDarkmode(id,type)
    {
        return await profileRepository.changeDarkmode(id,type);
    }

    async getUser(id){
        return await profileRepository.getUser(id);
    }
}

module.exports = new porfileService();