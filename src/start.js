const client = require('./auth/login');
const BotMessages = require('./handlers/richEmbedMessages');
const config = require('./config/auth');

client.on('message', msg => {
    if(msg.author.bot) return;

    const botMsg = new BotMessages();
    switch (msg.content) {
        case '!cgbot help':
            msg.channel.send(botMsg.onHelp());
            break;
        case '!cgbot markets':
            msg.channel.send(botMsg.onMarkets());
            break;
        case '!cgbot assets':
            msg.channel.send(botMsg.onAssets());
            break;
        default:
            msg.channel.send(botMsg.onError());
    }
});
