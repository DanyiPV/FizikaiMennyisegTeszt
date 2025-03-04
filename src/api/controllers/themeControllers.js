const themeRepository = require('../repositories/themeRepository');

const getAllThemesController = async (req, res) => {
  try {
    const themes = await themeRepository.getAllThemes();

    const uniqueThemes = themes.filter((theme, index, self) =>
      index === self.findIndex((t) => t.id === theme.id)
    );

    res.status(200).json(uniqueThemes);
  } catch (error) {
    console.error('Error in controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllThemesController,
};

