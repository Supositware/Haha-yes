const { Command } = require('discord-akairo');

class fartpissCommand extends Command {
	constructor() {
		super('fartpiss', {
			aliases: ['fartpiss'],
			cooldown: 86400000,
			ratelimit: 5,
			category: 'hidden',
			args: [
				{
					id: 'member',
					type: 'member'
				}
			],
			description: {
				content: 'fartpiss',
				usage: '',
				examples: ['']
			}
		});
	}

	async exec(message, args) {
		if (!args.member) {
			message.guild.members.get(message.author.id).setNickname('fart piss')
				.then(() => message.channel.send('sucessfully fart pissed on you <:youngtroll:488559163832795136'))
				.catch(() => message.channel.send('Sorry i could not fart piss on you :('));
		}
		args.member.setNickname('fart piss')
			.then(() => message.channel.send(`sucessfully fart pissed on ${args.member.user.username} <:youngtroll:488559163832795136>`))
			.catch(() => message.channel.send(`Sorry i could not fart piss on ${args.member.user.username} :(`));
	}
}

module.exports = fartpissCommand;