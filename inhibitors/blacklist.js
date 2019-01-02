const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
	constructor() {
		super('blacklist', {
			reason: 'blacklist'
		});
	}

	exec(message) {
		const blacklist = ['501856229123948545', '497730155691638784'];
		return blacklist.includes(message.author.id);
	}
}

module.exports = BlacklistInhibitor;