var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

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
        console.log(`starting hydration messages at ${startDate}`);
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
        }, 30 * 60 * 1 * 1000); // wait this many milliseconds before reminding again
    }
});
