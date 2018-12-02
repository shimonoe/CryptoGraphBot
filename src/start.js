const client = require('./auth/login');
const config = require('./config/auth');
const BotMessages = require('./handlers/richEmbedMessages');
const { getAssets, getPairs, getMarkets } = require('./api/fetchData');

const assets = getAssets();
const pairs = getPairs();
const markets = getMarkets();

client.on('message', msg => {
    if(msg.author.bot) return;

    const botMsg = new BotMessages(assets, pairs, markets);
    const userCMD = msg.content.split(/\s+/);
    if (userCMD[0] == '!cgbot') {
        switch (userCMD[1]) {
            case 'help':
                msg.channel.send(botMsg.onHelp());
                break;
            case 'assets':
                botMsg.onAssets((isNaN(parseInt(userCMD[userCMD.length -1])) ? 0 : parseInt(userCMD[userCMD.length - 1])))
                    .then(embed => {
                        msg.channel.send(embed);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'pairs':
                if (userCMD[2]) {
                    botMsg.onPairs(userCMD[2])
                        .then(embed => {
                            msg.channel.send(embed);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    break;
                }
            case 'markets':
                if (userCMD[2]) {
                    botMsg.onMarkets(userCMD[2])
                        .then(embed => {
                            msg.channel.send(embed);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    break;
                }
            default:
                if (userCMD.length == 4 || userCMD.length == 5)
                    botMsg.onPlot(...userCMD.slice(1, userCMD.length))
                        .then(embed => {
                            msg.channel.send(embed);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                else
                    msg.channel.send(botMsg.onError());
        }
    }
});
