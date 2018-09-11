const { Command } = require('discord.js-commando');
const responseObject = require("../../funFact.json");
module.exports = class FunFactCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'funfact',
            group: 'fun',
            memberName: 'funfact',
            description: `Send some fun fact. If you would like to see some of yours fun fact you can send them to @Supositware | Baguette#8211. There is currently **${Object.keys(responseObject).length}** fun fact.`,
        });
    }

    async run(message) {
        const number = Object.keys(responseObject).length;
        const funFactNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
            message.channel.send(`Fun fact: ${responseObject[funFactNumber]}`);
    }
};