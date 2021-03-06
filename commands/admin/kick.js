const { Command } = require('discord-akairo');

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			category: 'admin',
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: 'which member do you want to ban?',
					}
				},
				{
					id: 'reasons',
					type: 'string',
					prompt: {
						start: 'For what reasons?',
						optional: true
					},
					match: 'rest'
				}
			],
			clientPermissions: ['KICK_MEMBERS', 'SEND_MESSAGES'],
			userPermissions: ['KICK_MEMBERS'],
			channel: 'guild',
			description: {
				content: 'Kick user',
				usage: '[@user] [reason]',
				examples: ['@user big dumb dumb']
			}
		});
	}

	async exec(message, args) {
		let member = args.member;
		let reasons = args.reasons;

		if(member === this.client.user) 
			return message.channel.send('Cant kick me fool');
		if(member.id === message.author.id)
			return message.channel.send('Why would you kick yourself ?');
		if(!reasons)
			reasons = 'Nothing have been specified.';

		await member.send(`You have been kicked from **${message.guild.name}** for the following reasons: "**${reasons}**"`)
			.catch(() => console.log('could not send message to the concerned user'));
			
		return member.kick({reason: `Kicked by : ${message.author.username} for the following reasons: ${reasons}`})
			.then(() => message.reply(`${member.user.username} was succesfully kicked with the following reasons "${reasons}".`))
			.catch(err => console.error(err));
	}
}

module.exports = KickCommand;