const { RichEmbed } = require("discord.js");

class BotMessages {
    constructor(assetsList, pairsList, marketsList){
        this.embed = new RichEmbed();
        this.assetsText = assetsList;
        this.pairsText = pairsList;
        this.marketsText = marketsList;
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

    onAssets() {
        this.resetTemplate();
        this.assetsText.then(text => {
            this.embed.addField("Here is the list of available assets.", "---")
                .addField("Use ONE of those codes on your query:", "lista!");
            return this.embed;
        })
            .catch(error => {
                console.log(error);
            })
    }

    onPairs(asset) {
        this.resetTemplate();

        var str = asset.toUpperCase();
        this.embed.addField(`Here is the list of available pairs for ${str}.`, "---")
            .addField("Use ONE of those codes on your query:",
            `TODO: Get the list from the api endpoint
            `);
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
