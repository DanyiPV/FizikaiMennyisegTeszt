const logregRepository  = require("../repositories/logregRepository");

class logregService
{
    async checkUser(email, user_name)
    {
        return await logregRepository.checkUser(email, user_name);
    }
    
    async registerUser(user)
    {
        return await logregRepository.registerUser(user);
    }

    async getUser(email,id)
    {
        return await logregRepository.getUser(email,id);
    }

    async getToken(token)
    {
        return await logregRepository.getToken(token);
    }
    
    async uploadToken(tokenz)
    {
        return await logregRepository.uploadToken(tokenz);
    }

    async getUserAndCustomization(id)
    {
        return await logregRepository.getUserAndCustomization(id);
    }

    async SetNewPassword(user_id, new_password)
    {
        return await logregRepository.SetNewPassword(user_id, new_password);
    }

    async getUseridThroughToken(token){
        return await logregRepository.getUseridThroughToken(token)
    }
}

module.exports = new logregService();