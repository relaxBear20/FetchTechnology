const NodeCache = require('node-cache');
const a = require('axios');
//set evict in 30 days
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 900 });
const API_KEY = process.env.API_KEY || '';

async function updateCoinList() {
    try {
        console.log("run interval to update coin list")
        const response = await a.get(`https://api.coingecko.com/api/v3/coins/list`, {
            headers: {
                x_cg_demo_api_key: API_KEY,
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        // console.log(JSON.stringify(response.data))
        cache.set('coinList', response.data);
    } catch (error) {
        console.log('error ' + error)
    }
}
updateCoinList();

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