const profileRepository  = require("../repositories/profileRepository");

class porfileService
{
    async changeDarkmode(id,type)
    {
        return await profileRepository.changeDarkmode(id,type);
    }
    
    async getDarkmode(id)
    {
        return await profileRepository.getDarkmode(id);
    }
}

module.exports = new porfileService();