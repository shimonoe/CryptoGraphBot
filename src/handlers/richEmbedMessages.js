const { RichEmbed } = require("discord.js");

class BotMessages {
    constructor(){
        const embed = new RichEmbed();
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
        this.embed.addField("This is how to communicate with me:", "!cgbot <market> <cryptocurrency> <period>")
            .addField("Arguments:",
            `<market>: Select one of those listed in command "!cgbot markets"
            <cryptocurrency>: Use command "!cgbot assets" to view available options
            <period>: Options avalilable are 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d, 3d, 1w
            `)
            .addField("Example:", "!cgbot kraken btcusa 15m")
        return this.embed;
    }

    onMarkets() {
        this.resetTemplate();
        this.embed.addField("Here is the list of available markets.")
            .addField("Use ONE of those codes on your query:",
            `TODO: Get the list from the api endpoint
            `);
        return this.embed;
    }

    onAssets() {
        this.resetTemplate();
        this.embed.addField("Here is the list of available assets.")
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
