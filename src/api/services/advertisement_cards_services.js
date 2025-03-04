const advertisement_cards_repository = require('../repositories/advertisement_cards_repository')

class AdvertisementCardsService{
    async getAds(){
        return await advertisement_cards_repository.getAds();
    }
}
module.exports = new AdvertisementCardsService();