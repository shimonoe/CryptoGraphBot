const client = require('./auth/login');
const config = require('./config/auth');
const BotMessages = require('./handlers/richEmbedMessages');
const { assetsObjectToText } = require('./handlers/formatData');
const { getAssets, getPairs, getMarkets, getMarketData } = require('./api/fetchData');

const assets = getAssets();
const pairs = getPairs();
const markets = getMarkets();

const assetsList = assetsObjectToText(assets);
const pairsList = "";
const marketsList = "";

client.on('message', msg => {
    if(msg.author.bot) return;

    const botMsg = new BotMessages(assetsList, pairsList, marketsList);
    const userCMD = msg.content.split(/\s+/);
    if (userCMD[0] == '!cgbot') {
        switch (userCMD[1]) {
            case 'help':
                msg.channel.send(botMsg.onHelp());
                break;
            case 'assets':
                msg.channel.send(botMsg.onAssets());
                break;
            case 'pairs':
                if (userCMD[2]) {
                    msg.channel.send(botMsg.onPairs(userCMD[2]));
                    break;
                }
            case 'markets':
                if (userCMD[2]) {
                    msg.channel.send(botMsg.onMarkets(userCMD[2]));
                    break;
                }
            default:
                msg.channel.send(botMsg.onError());
        }
    }
});
