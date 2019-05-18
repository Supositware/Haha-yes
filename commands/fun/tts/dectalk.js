const { Command } = require('discord-akairo');
const axios = require('axios');
const fs = require('fs');

class dectalkCommand extends Command {
	constructor() {
		super('dectalk', {
			aliases: ['dectalk', 'dec'],
			category: 'fun',
			args: [
				{
					id: 'decMessage',
					type: 'string',
					match: 'rest'
				}
			],
			description: {
				content: 'Send a wav of what you wrote into .wav with dectalk',
				usage: '[text]',
				examples: ['This command is very epic']
			}
		});
	}

	async exec(message, args) {
		args.decMessage = args.decMessage.replace('\n', ' ');
		args.decMessage = encodeURI(args.decMessage);

		return axios.request({
			responseType: 'arraybuffer',
			url: `https://talk.moustacheminer.com/api/gen.wav?dectalk=${args.decMessage}`,
			method: 'get',
			headers: {
				'Content-Type': 'audio/wav',
			},
		}).then((result) => {
			const outputFilename = './dectalk.wav';
			fs.writeFileSync(outputFilename, result.data);
			return message.channel.send({files: ['./dectalk.wav']});
		});

	}
}

module.exports = dectalkCommand;