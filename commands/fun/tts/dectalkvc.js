const { Command } = require('discord-akairo');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const rand = require('../../../rand.js');

class dectalkvcCommand extends Command {
	constructor() {
		super('dectalkvc', {
			aliases: ['dectalkvc', 'decvc'],
			category: 'fun',
			args: [
				{
					id: 'decMessage',
					type: 'string',
					prompt: {
						start: 'Write something so i can say it back in dectalk',
					},
					match: 'rest'
				}
			],
			description: {
				content: 'Repeat what you sent in the voice chat you are currently in',
				usage: '[text]',
				examples: ['This command is very epic']
			}
		});
	}

	async exec(message, args) {
		args.decMessage = rand.random(args.decMessage, message);
		args.decMessage = args.decMessage.replace('\n', ' ');
		let decMessage = '[:phoneme on] ' + args.decMessage;

		if (process.platform == 'win32') {
			exec(`cd .\\dectalk && .\\say.exe -w dectalkvc.wav "${decMessage}"`)
				.catch(err => {
					return console.error(err);
				})
				.then(async () => {
					const voiceChannel = message.member.voice.channel;
					if (!voiceChannel) return message.say('Please enter a voice channel first.');
					try {
						const connection = await voiceChannel.join();
						const dispatcher = connection.play('./dectalk/dectalk.wav');
						dispatcher.once('finish', () => voiceChannel.leave());
						dispatcher.once('error', () => voiceChannel.leave());
						return null;
					} catch (err) {
						voiceChannel.leave();
						return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
					}
				});
			
		} else if (process.platform == 'linux' || process.platform == 'darwin') {
			exec(`cd dectalk && DISPLAY=:0.0 wine say.exe -w dectalkvc.wav "${decMessage}"`)
				.catch(err => {
					return console.error(err);
				})
				.then(async () => {
					const voiceChannel = message.member.voice.channel;
					if (!voiceChannel) return message.say('Please enter a voice channel first.');
					try {
						const connection = await voiceChannel.join();
						const dispatcher = connection.play('./dectalk/dectalkvc.wav');
						dispatcher.once('finish', () => voiceChannel.leave());
						dispatcher.once('error', () => voiceChannel.leave());
						return null;
					} catch (err) {
						voiceChannel.leave();
						return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
					}
				});
		}


	}
}

module.exports = dectalkvcCommand;