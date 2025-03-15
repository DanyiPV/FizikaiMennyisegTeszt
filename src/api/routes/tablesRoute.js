const express = require("express");
const route = express.Router();

const tablesController = require('../controllers/tablesController');

const profileAuth = require('../middlewares/profileAuth');

route.get('/full-categories', tablesController.fullCategories);

route.post('/full-subcategories', tablesController.fullSubcategories);

route.get('/full-tables', tablesController.fullTables);

route.get('/all-tables', tablesController.allTables);

route.post('/traning-tables', tablesController.getTraningTables);

route.post('/get-final-stats', tablesController.getFinalStats);

route.get('/get-results', tablesController.getResults);

route.get('/get-osztalyok', [ profileAuth.verifyToken ], tablesController.getOsztalyok);

module.exports = route;