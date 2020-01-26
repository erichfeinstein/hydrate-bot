var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var THIRTY_MINUTES = 1000 * 60 * 30;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true,
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
});

bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, rawEvent) {
    if (message === '!hydrate') {
        let startDate = Date().toString();
        console.log(`Starting hydration messages at ${startDate}`);
        bot.sendMessage({
            to: channelID,
            message: 'Great, I will make sure everybody stays hydrated! :)',
        });
        var interval = setInterval(function() {
            let dateTime = Date().toString();
            console.log(`sending message at ${dateTime}`);
            bot.sendMessage({
                to: channelID,
                message:
                    'Hey everybody, drink some water! I will remind you again in 30 minutes',
            });
        }, THIRTY_MINUTES); // 30 minutes.
    }
});
