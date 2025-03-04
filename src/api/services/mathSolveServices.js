const mathSolveRepository  = require("../repositories/mathSolveRepository");

class UserService
{
    async getUsers()
    {
        return await mathSolveRepository.getUsers();
    }
}

module.exports = new UserService();