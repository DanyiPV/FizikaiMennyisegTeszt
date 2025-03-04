const userdataService = require('../services/userdataService');

const getUserData = async (req, res, next) => {
    try {
        const { id } = req.query; // Or use req.params if the route uses a path parameter
        const userinfo = await userdataService.getUserInfo(id);
        res.status(200).json(userinfo);
    } catch (error) {
        console.error('Error in controller:', error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getUserData,
  };