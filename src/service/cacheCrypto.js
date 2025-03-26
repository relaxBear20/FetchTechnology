const NodeCache = require('node-cache');
const axios = require('axios');
//set evict in 30 days
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 900 }); 
const API_KEY = process.env.API_KEY || '';

async function updateCoinList() {
    try {
        console.log("run interval to update coin list")
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list`,);
        cache.set('coinList', response.data);
    } catch (error) {
        console.log('error ' + error)
    }
}
// Initial load
updateCoinList();
// Auto-refresh every 30 minutes
setInterval(updateCoinList, 30 * 60 * 1000);

function getCoinList() {
    return cache.get('coinList') || [];
}

async function getCoinIdBySymbol(symbol) {
    const coins = getCoinList();
    
    if (!coins.length) {
        await updateCoinList();
    }

    const res = coins.filter(c => c.symbol.toLowerCase() === symbol.toLowerCase());

    if (res.length === 0) {
        return null;
    }
    return res;
}


module.exports = { getCoinIdBySymbol };