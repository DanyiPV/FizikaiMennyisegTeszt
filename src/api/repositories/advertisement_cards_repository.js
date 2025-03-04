const db = require('../database/dbContext')
const {Advertisement_Cards} = db;

const AdvertisementCardsRepository = {
    async getAds(){
        return await Advertisement_Cards.findAll();
    }
}

module.exports =AdvertisementCardsRepository;