const { RichEmbed } = require("discord.js");
const { getMarketData } = require("../api/fetchData");
const allowedPeriods = require('../api/timeperiods');
const dataFormatter = require('../charts/dataFormatter');
const DrawChart = require('../charts/drawChart');

class BotMessages {
    constructor(assets, pairs, markets){
        this.embed = new RichEmbed();
        this.assets = assets;
        this.pairs = pairs;
        this.markets = markets;
        this.drawChart = null;
    }

    setBaseTemplate() {
        const template = new RichEmbed()
            .setTitle("CryptoGraphBot - Your assistant for graph generation of cryptocurrency markets.")
            .setAuthor("By Adriano Shimonoe")
            .setColor(15304469)
            .setFooter("\nProject made for the final project assignment of MCZA011-17 - Laboratório de Redes.")
            .setTimestamp()
            .setURL("https://github.com/shimonoe/CryptoGraphBot");
        return template;
    }

    embedMessage() {
        return this.embed;
    }

    resetTemplate() {
        this.embed = this.setBaseTemplate();
    }

    onHelp() {
        this.resetTemplate();
        this.embed.addField("This is how to communicate with me:", "!cgbot <pair> <market> <period> <graph type>")
            .addField("Arguments:",
                `<assets>: Use command "!cgbot assets" to view available assets
                <pair>: Use command "!cgbot pairs <asset>" to view possible quotes for a specific asset
                <market>: Select one of those listed in command "!cgbot markets <pair>"
                <period>: Options avalilable are 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d, 3d, 1w
                <graph type> (Optional) Pass 'true' if you want to plot the graph without simple moving average calculation.
                `)
            .addField("Example:", "!cgbot btcusd kraken 15m true")
        return this.embed;
    }

    async onAssets(page) {
        this.resetTemplate();
        this.embed.addField("Here is the list of available assets.", "Use ONE of those codes on your query");
        try {
            await this.assets.then(obj => {
                var coinList = Object.keys(obj).sort();
                var chunks = [];
                while (coinList.length)
                    chunks.push(coinList.splice(0, 10).map(coin => {
                        return `${coin}: ${obj[coin]}`;
                    }));

                if (page < chunks.length && page >= 0) {
                    this.embed.addField("coin name: code", chunks[page])
                        .addField(`Page: ${page} of ${chunks.length - 1}`,
                            "Indicate page number to get more coins: **!cgbot assets <page number>**");
                } else {
                    this.embed.addField("Error", `Must indicate page between 0 and ${chunks.length - 1}`);
                }
            });
        } catch (error) {
            console.log(error);
        }
        return this.embed;
    }

    async onPairs(asset) {
        this.resetTemplate();

        var str = asset.toUpperCase();
        this.embed.addField(`Here is the list of available pairs for **${str}.**`, "Use ONE of those codes on your query");
        try {
            await this.pairs.then(obj => {
                try {
                    var pairsOf = obj[asset].map(p => {
                        return `${asset + p} (${asset} -> ${p})`;
                    });
                    this.embed.addField("pair code (asset quoted to another asset)", pairsOf);
                } catch (error) {
                    console.log(error);
                    this.resetTemplate();
                    this.embed.addField(`Asset **${str}** not found!`, "Use **!cgbot assets** to get a valid code.");
                }
            });
        } catch (error) {
            console.log(error);
        }
        return this.embed;
    }

    async onMarkets(pair) {
        this.resetTemplate();

        if (pair.length < 5) {
            this.embed.addField(`Invalid pair code ${pair}`, "Please use **!cgbot pairs <asset>** to get a valid code.");
            return this.embed;
        }

        var str = pair.toUpperCase();
        this.embed.addField(`Here is the list of available markets for ${str}.`,
            `Quote: ${str.slice(0, 3)}->${str.slice(3,str.length)}`)

        try {
            await this.markets.then(obj => {
                this.embed.addField("codes:", obj[pair].sort());
            });
        } catch (error) {
            console.log(error);
            this.embed.addField("I'm sorry! I think there is no active markets for this pair.", "Please try another nome.");
        }

        return this.embed;
    }

    async onPlot(pair, market, period, full=false) {
        this.resetTemplate();
        try {
            await getMarketData(market, pair, "price")
                .then(res => {
                    var txt = `Current **${pair.slice(0,3).toUpperCase()}** price is **${res.price}** (${pair.slice(3,pair.length).toUpperCase()})`;
                    this.embed.addField(txt, "Click on image then 'open original' to view the fullsize version.");
                });
            await getMarketData(market, pair, "ohlc", period)
                .then(ohlc => {
                    const quotes = ohlc[allowedPeriods[period]];
                    const data = dataFormatter(quotes, full);
                    this.drawChart = new DrawChart(data);
                });
            await this.drawChart.getImageBuffer()
                .then(img => {
                    this.embed.attachFile(img);
                    this.drawChart.destroy();
                });
        } catch (error) {
            console.log(error);
            this.embed.addField("I'm sorry! Somethin went wrong...");
        }
        return this.embed;
    }

    onError() {
        this.resetTemplate();
        this.embed
            .addField("I'm sorry!", "Type '!cgbot help' to get available comands.")
            .setColor(16711680)
            .setImage("https://cdn.dribbble.com/users/3016/screenshots/1815466/sadbot.png");
        return this.embed;
    }
};

module.exports = BotMessages;
