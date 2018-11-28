const client = require('./auth/login');
const BotMessages = require('./handlers/richEmbedMessages');

client.on('message', msg => {
    if(msg.author.id === client.user.id) {
        return;
    } else {
        const botMsg = new BotMessages();
        switch (msg.content) {
            case '!cgbot help':
                msg.channel.send(botMsg.onHelp());
            case '!cgbot markets':
                msg.channel.send(botMsg.onMarkets());
            case '!cgbot assets':
                msg.channel.send(botMsg.onAssets());
            default:
                msg.channel.send(botMsg.onError());
        }
        return;
    }
});
