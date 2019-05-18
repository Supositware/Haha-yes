const { Command } = require('discord-akairo');
const axios = require('axios');
const fs = require('fs');

class samCommand extends Command {
	constructor() {
		super('sam', {
			aliases: ['sam'],
			category: 'fun',
			args: [
				{
					id: 'samMessage',
					type: 'string',
					match: 'rest'
				}
			],
			description: {
				content: 'Send a mp3 of what you wrote in Microsoft Sam tts, can change speed and pitch with [speed:a number] and [pitch:a]',
				usage: '[text]',
				examples: ['Here comes the roflcopter soisoisoisoisoi']
			}
		});
	}

	async exec(message, args) {
		let pitch = '';
		if (args.samMessage.includes('[pitch:')) {
			pitch = args.samMessage.split(/(\[pitch:.*?])/);
			for (let i = 0, l = pitch.length; i < l; i++) {
				if (pitch[i].includes('[pitch:')) {
					pitch = pitch[i].replace('[pitch:', '').slice(0, -1);
					args.samMessage = args.samMessage.replace(/(\[pitch:.*?])/g, '');
					i = pitch.length;
				}
			}
		} else {
			pitch = 100;
		}

		let speed = '';
		if (args.samMessage.includes('[speed:')) {
			speed = args.samMessage.split(/(\[speed:.*?])/);
			for (let i = 0, l = speed.length; i < l; i++) {
				if (speed[i].includes('[speed:')) {
					speed = speed[i].replace('[speed:', '').slice(0, -1);
					args.samMessage = args.samMessage.replace(/(\[speed:.*?])/g, '');
					i = speed.length;
				}
			}
		} else {
			speed = 100;
		}

		args.samMessage = args.samMessage.replace('\n', ' ');
		args.samMessage = encodeURI(args.samMessage);

		return axios.request({
			responseType: 'arraybuffer',
			url: `https://tetyys.com/SAPI4/SAPI4?text=${args.samMessage}&voice=Sam&pitch=${pitch}&speed=${speed}`,
			method: 'get',
			headers: {
				'Content-Type': 'audio/mpeg',
			},
		}).then((result) => {
			const outputFilename = './sam.mp3';
			fs.writeFileSync(outputFilename, result.data);
			return message.channel.send({files: ['./sam.mp3']});
		});

	}
}

module.exports = samCommand;