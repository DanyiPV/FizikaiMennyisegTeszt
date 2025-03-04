const advertisement_cards_service = require('../services/advertisement_cards_services')

const getAds = async (req,res,next) => {
    try{
        const data = await advertisement_cards_service.getAds();
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getAds
}