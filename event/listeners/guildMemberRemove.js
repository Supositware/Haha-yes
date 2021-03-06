const { Listener } = require('discord-akairo');
const leaveChannel = require('../../models').leaveChannel;
const rand = require('../../rand.js');

class guildMemberRemoveListener extends Listener {
	constructor() {
		super('guildMemberRemove', {
			emitter: 'client',
			event: 'guildMemberRemove'
		});
	}

	async exec(member) {
		const leave = await leaveChannel.findOne({where: {guildID: member.guild.id}});
		if (leave) {
			const channel = this.client.channels.resolve(leave.get('channelID'));

			let byeMessage = leave.get('message');

			let invite = new RegExp(/(https?:\/\/)?(www\.)?discord(?:app\.com|\.gg)[/invite/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9-]{2,32})/g);

			let username = member.user.username;
			let user = member.user;
			if (username.match(invite)) {
				username = username.replace(/(https?:\/\/)?(www\.)?discord(?:app\.com|\.gg)[/invite/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9-]{2,32})/g, '[REDACTED]');
				user = username;
			}

			byeMessage = byeMessage.replace(/\[member\]/, username);
			byeMessage = byeMessage.replace(/\[memberPing\]/, user);
			byeMessage = byeMessage.replace(/\[server\]/, member.guild.name);

			let attach;
			if (byeMessage.includes('[attach:')) {
				attach = byeMessage.split(/(\[attach:.*?])/);
				for (let i = 0, l = attach.length; i < l; i++) {
					if (attach[i].includes('[attach:')) {
						attach = attach[i].replace('[attach:', '').slice(0, -1);
						i = attach.length;
					}
				}
				byeMessage = byeMessage.replace(/(\[attach:.*?])/, '');
			}

			byeMessage = rand.random(byeMessage);	


			if (attach) {
				return channel.send(byeMessage, {files: [attach]});
			} else {
				return channel.send(byeMessage);
			}
		}
	}
}
module.exports = guildMemberRemoveListener;