const express = require("express");
const route = express.Router();

const tablesController = require('../controllers/tablesController');

route.get('/full-categories', tablesController.fullCategories);

route.post('/full-subcategories', tablesController.fullSubcategories);

route.get('/full-tables', tablesController.fullTables);

route.get('/all-tables', tablesController.allTables);

module.exports = route;