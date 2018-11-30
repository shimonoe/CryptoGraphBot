const axios = require('axios');
const endpoints = require('./endpoints');

/*
const getAssets = async () => {
    try {
        return await axios.get(endpoints.assets);
    } catch (error) {
        console.log(error);
    }
}

const countAssets = async () => {
    const assets = await getAssets();
    if (assets.data.result) {
        return assets.data.result;
    }
}
*/

const getAssets = async () => {
    return await axios.get(endpoints.assets)
    .then(response => {
        const res = response.data.result;
        const assets = {};
        for (var key in res) {
            const coin = res[key];
            assets[coin.name] = coin.symbol;
        }
        return assets;
    })
    .catch(error => {
        return {"error": error};
    });
}

const getPairs = async () => {
    return await axios.get(endpoints.pairs)
    .then(response => {
        const res = response.data.result;
        const pairs = {};
        for (var key in res) {
            const pair = res[key];
            if (!pairs[pair.base.symbol]) {
                pairs[pair.base.symbol] = [pair.quote.symbol];
            } else {
                if (!pairs[pair.base.symbol].includes(pair.quote.symbol) && pair.base.symbol !== pair.quote.symbol)
                    pairs[pair.base.symbol].push(pair.quote.symbol);
            }
        }
        return pairs;
    })
    .catch(error => {
        return {"error": error};
    });
}

const getMarkets = async () => {
    return await axios.get(endpoints.markets)
    .then(response => {
        const res = response.data.result;
        const markets = {};
        for (var key in res) {
            const market = res[key];
            if (market.active) {
                if (!markets[market.pair]) {
                    markets[market.pair] = [market.exchange];
                } else {
                    if(!markets[market.pair].includes(market.exchange))
                        markets[market.pair].push(market.exchange);
                }
            }
        }
        return markets;
    })
    .catch(error => {
        return {"error": error};
    });
}

const getMarketData = async (market, pair, route) => {
    const url = `${endpoints.markets}/${market}/${pair}/${route}`;
    return await axios.get(url)
        .then(response => {
            return response.data.result;
        })
        .catch(error => {
            return {"error": error};
        })
}

module.exports = {getAssets, getPairs, getMarkets, getMarketData};
