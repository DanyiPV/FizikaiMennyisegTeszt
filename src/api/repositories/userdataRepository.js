const db = require('../database/dbContext')
const {Users} = db;

const userDataRepository = {
    async getUserInfo(id) {
        try {
            return await Users.findOne({ where: { id } });
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

   
};

module.exports = userDataRepository;
