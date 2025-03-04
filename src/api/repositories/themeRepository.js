// repositories/themeRepository.js
const db = require('../database/dbContext');
const { Themes } = db;

const themeRepository = {
  getAllThemes: async () => {
    try {
      const themes = await Themes.findAll({
        distinct: true,
        order: [['id', 'ASC']],
        limit: 25,
      });
      return themes;
    } catch (error) {
     
    }
  },
};

module.exports = themeRepository;
