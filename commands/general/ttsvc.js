const { Command } = require('discord-akairo');
const textToSpeech = require('@google-cloud/text-to-speech');
const gclient = new textToSpeech.TextToSpeechClient();
const fs = require('fs');

class TtsvcCommand extends Command {
	constructor() {
		super('ttsvc', {
			aliases: ['ttsvc'],
			category: 'general',
			split: 'none',
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'rest'
				}
			],
			description: {
				content: 'Say what you wrote in voice channel',
				usage: '[text]',
				examples: ['hello']
			}
		});
	}

	async exec(message, args) {
		let text = args.text;

		// Construct the request
		const request = {
			input: { text: text },
			// Select the language and SSML Voice Gender (optional)
			voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
			// Select the type of audio encoding
			audioConfig: { audioEncoding: 'MP3' },
		};

		// Performs the Text-to-Speech request
		gclient.synthesizeSpeech(request, (err, response) => {
			if (err) {
				console.error('ERROR:', err);
				return;
			}

			// Write the binary audio content to a local file
			fs.writeFile('ttsvc.mp3', response.audioContent, 'binary', err => {
				if (err) {
					console.error('ERROR:', err);
					message.channel.send('An error has occured, the message is probably too long');
					
					return;
				}
				console.log('Audio content written to file: ttsvc.mp3');

				//  If not in voice channel ask user to join

				if (message.member.voice.channel) {
					const connection = message.member.voice.channel.join();
					const dispatcher = connection.play('./ttsvc');

					dispatcher.on('finish', () => {
						connection.leave();
					});
				} else {
					message.reply('You need to join a voice channel first!');
				}
			});
		});
	}
}
module.exports = TtsvcCommand;