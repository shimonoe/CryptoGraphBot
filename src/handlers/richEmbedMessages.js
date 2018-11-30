const { RichEmbed } = require("discord.js");

class BotMessages {
    //constructor(assetsList, pairsList, marketsList){
    constructor(assets, pairs, markets){
        this.embed = new RichEmbed();
        this.assets = assets;
        this.pairs = pairs;
        this.markets = markets;
    }

    setBaseTemplate() {
        const template = new RichEmbed()
            .setTitle("CryptoGraphBot - Your assistant for graph generation of cryptocurrency markets.")
            .setAuthor("By Adriano Shimonoe")
            .setColor(15304469)
            .setFooter("\nProject made for the final project assignment of MCZA011-17 - Laboratório de Redes.")
            .setTimestamp()
            .setURL("https://ufabc.edu.br");
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
        this.embed.addField("This is how to communicate with me:", "!cgbot <pair> <market> <period>")
            .addField("Arguments:",
                `<assets>: Use command "!cgbot assets" to view available assets
                <pair>: Use command "!cgbot pairs <asset>" to view possible quotes for a specific asset
                <market>: Select one of those listed in command "!cgbot markets <asset>"
                <period>: Options avalilable are 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d, 3d, 1w
                `)
            .addField("Example:", "!cgbot btcusa kraken 15m")
        return this.embed;
    }

    async onAssets(page) {
        this.resetTemplate();
        this.embed.addField("Here is the list of available assets.", "Use ONE of those codes on your query");
        try {
            this.assets.then(obj => {
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
        this.embed.addField(`Here is the list of available pairs for ${str}.`, "Use ONE of those codes on your query");
        try {
            this.pairsText.then(text => {
                console.log(text);
            });
        } catch (error) {
            console.log(error);
        }


        return this.embed;
    }

    onMarkets(asset) {
        this.resetTemplate();

        var str = asset.toUpperCase();
        this.embed.addField(`Here is the list of available markets for ${str}.`,
            `${str.slice(0, 3)}->${str.slice(3,-1)}`)
            .addField("Use ONE of those codes on your query:",
            `TODO: Get the list from the api endpoint
            `);
        return this.embed;
    }

    onError() {
        this.resetTemplate();
        this.embed.addField("I'm sorry!", "Type '!cgbot help' to get available comands.")
            .setColor(16711680)
            .setImage("https://cdn.dribbble.com/users/3016/screenshots/1815466/sadbot.png");
        return this.embed;
    }
};

module.exports = BotMessages;
