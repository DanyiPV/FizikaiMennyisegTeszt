const tablesService = require("../services/tablesService");

exports.fullCategories = async (req,res,next) =>{
    const categories = await tablesService.fullCategories();

    res.status(200).send(categories);
}

exports.fullSubcategories = async (req,res,next) =>{
    const idList = req.body;

    console.log(idList);

    const subcategories = await tablesService.fullSubcategories(idList);

    res.status(200).send(subcategories);
}

exports.fullTables = async (req,res,next) =>{
    const id = req.query.id;

    const categories = await tablesService.fullTables(id);

    res.status(200).send(categories);
}

exports.allTables = async (req,res,next) =>{
    const allTable = await tablesService.allTables();

    res.status(200).send(allTable);
}