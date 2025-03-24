require('dotenv').config();
const axios = require('axios');
const API_KEY = process.env.API_KEY || '';
const { getCoinIdBySymbol } = require('../service/cacheCrypto');


async function getCryptoListBySymbol(req, res) {
    try {
        var result = await getCoinIdBySymbol(req.params.symbol);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
async function getCryptoMarketPrice(req, res) {
    try {
        var coinId = req.params.symbol;
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}`, {
            params: {vs_currencies: 'usd'},
            headers: { x_cg_demo_api_key: API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

async function getCryptoPriceHistory(req, res) {

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${name}/market_chart`, {
            params: { vs_currency: 'usd', days }
        });
        const priceHistory = response.data.prices.map(entry => ({
            date: new Date(entry[0]).toISOString().split('T')[0],
            price: entry[1]
        }));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
module.exports = { getCryptoPriceHistory, getCryptoMarketPrice, getCryptoListBySymbol };