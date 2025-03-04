const userRepository = require('../repositories/userdataRepository');
class UserInfo {
    async getUserInfo(id) {
        try {
            return await userRepository.getUserInfo(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserInfo();
