const express = require('express');
const router = express.Router();
const { getAllThemesController } = require('../controllers/themeControllers');

router.get('/', getAllThemesController);

module.exports = router;