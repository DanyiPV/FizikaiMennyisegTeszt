const contestService = require("../services/contestService");

exports.getLeaderBoard = async (req, res, next) => {
    const get_leaderBoard = await contestService.getLeaderBoard();

    res.status(200).send(get_leaderBoard);
};