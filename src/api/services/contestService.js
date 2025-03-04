const contestRepository  = require("../repositories/contestRepository");

class contestService
{
    async getLeaderBoard(){
        return await contestRepository.getLeaderBoard();
    }
}

module.exports = new contestService();