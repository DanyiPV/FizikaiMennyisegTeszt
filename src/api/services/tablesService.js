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

    async getRandomRows(alkatIds, sorok)
    {
        return await tablesRepository.getRandomRows(alkatIds, sorok);
    }

    async getOsztaly(user_id)
    {
        return await tablesRepository.getOsztaly(user_id);
    }

    async getAchivedPoints(tablak)
    {
        return await tablesRepository.getAchivedPoints(tablak);
    }

    async uploadResult(newResult)
    {
        return await tablesRepository.uploadResult(newResult);
    }

    async getUserResults(id){
        return await tablesRepository.getUserResults(id);
    }

    async getOsztalyok(){
        return await tablesRepository.getOsztalyok();
    }

    async getUsersResults(search, osztaly, last){
        return await tablesRepository.getUsersResults(search, osztaly, last);
    }

    async getCheckedUser(id){
        return await tablesRepository.getCheckedUser(id);
    }
}

module.exports = new logregService();