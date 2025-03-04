const tablesRepository  = require("../repositories/tablesRepository");

class logregService
{
    async fullCategories()
    {
        return await tablesRepository.fullCategories();
    }
    
    async fullSubcategories(id)
    {
        return await tablesRepository.fullSubcategories(id);
    }

    async fullTables(id)
    {
        return await tablesRepository.fullTables(id);
    }

    async allTables()
    {
        return await tablesRepository.allTables();
    }
}

module.exports = new logregService();