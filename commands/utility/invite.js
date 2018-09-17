const { Command } = require('discord.js-commando');
module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'utility',
            memberName: 'invite',
            description: 'Send invite to add the bot',
        });
    }

    async run(message) {
        return message.say('You can add me from here: https://discordapp.com/oauth2/authorize?client_id=487342817048264704&scope=bot&permissions=2054\nYou can join my support server over here: https://discord.gg/SsMCsVY come and say hi :)');
    }
};