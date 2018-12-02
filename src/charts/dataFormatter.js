const sma = require('sma');

const dataFormatter = (data, full=false) => {
    var payload = {};
    var closePrices = [];
    var highPrices = [];
    var lowPrices = [];

    data.map(row => {
        //labels.push(new Date(row[0]*1000).toISOString().slice(0, 16).replace('T', ' '));
        closePrices.push(row[4]);
        highPrices.push(row[2]);
        lowPrices.push(row[3]);
    });

    payload = {
        "averagePrices": (full ? closePrices: sma(closePrices, 2)),
        "highPrices": (full ? highPrices: sma(highPrices, 2)),
        "lowPrices": (full ? lowPrices: sma(lowPrices, 2)),
    }

    return payload;
};

module.exports = dataFormatter;
