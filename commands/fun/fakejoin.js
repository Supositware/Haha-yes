const { Command } = require('discord-akairo');
const joinChannel = require('../../models').joinChannel;

class fakejoinCommand extends Command {
	constructor() {
		super('fakejoin', {
			aliases: ['fakejoin'],
			category: 'admin',
			channelRestriction: 'guild',
			clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
			args: [
				{
					id: 'user',
					type: 'user',
					match: 'rest'
				}
			],
			description: {
				content: 'Fake join message',
				usage: '[text]',
				examples: ['Supositware']
			}
		});
	}

	async exec(message, args) {
		let member;
		const join = await joinChannel.findOne({where: {guildID: message.guild.id}});
		
		if (join) {
			if (args.user)
				member = message.guild.members.get(args.user.id);
			else
				member = message.guild.members.get(message.author.id);
		} else {
			return message.channel.send('There is no join channel setup');
		}

		this.client.emit('guildMemberAdd', member);
	}
}

module.exports = fakejoinCommand;