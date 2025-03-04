const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const router = express.Router();

function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
function SelectLink(){
  if(getRandomNum(0,1) == 0)
  {
    return `https://www.citatum.hu/kategoria/matematika/${getRandomNum(1,34)}`;
  }
  return '`https://www.citatum.hu/kategoria/matematika';
  
}
router.get('/', async (req, res) => {
  try {
    
    const response = await axios.get(SelectLink(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      responseType: 'arraybuffer',
    });

    const decodedData = iconv.decode(response.data, 'ISO-8859-2');

    const $ = cheerio.load(decodedData);
    const quotes = [];

    $('div[id]').find('p:not([class]):not([id])').each((index, element) => {
      const quoteText = $(element).text().trim();
      if (quoteText) {
        quotes.push(quoteText);
      }
    });
    

    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      res.json({ quote: quotes[randomIndex] });
    } else {
      res.json({ quote: 'No quotes found.' });
    }
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
    res.status(500).json({ error: 'Failed to load quotes.' });
  }
});

module.exports = router;
