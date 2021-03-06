const { Command } = require('discord-akairo');

class PruneCommand extends Command {
	constructor() {
		super('Prune', {
			aliases: ['Prune', 'clean', 'purge', 'clear'],
			category: 'admin',
			args: [
				{
					id: 'amount',
					prompt: {
						start: 'How many message should i delete?',
					},
					type: 'integer'
				}
			],
			clientPermissions: ['MANAGE_MESSAGES', 'SEND_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			channel: 'guild',
			description: {
				content: 'Bulk delete messages',
				usage: '[amount]',
				examples: ['50']
			}
		});
	}

	async exec(message,args) {
		if (args.amount >= 100) return;
		message.channel.bulkDelete(args.amount + 1, true);
	}
}

module.exports = PruneCommand;