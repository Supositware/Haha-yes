const { Command } = require('discord-akairo');
const attachment = require('../../utils/attachment');
const { createCanvas, loadImage } = require('canvas');
const superagent = require('superagent');

class paintCommand extends Command {
	constructor() {
		super('paint', {
			aliases: ['paint'],
			category: 'images',
			clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
			args: [
				{
					id: 'image',
					type: 'string',
					optional: true,
				}
			]
		});
	}

	async exec(message, args) {
		let image = args.image;
		if (!image)
			image = await attachment(message);
		else if (!image)
			image = message.author.displayAvatarURL().replace('webp', 'png');
		else if(image.endsWith('gif'))
			return message.channel.send('Gif dosent work, sorry');

		
		let loadingmsg = await message.channel.send('Processing <a:loadingmin:527579785212329984>')

		const canvas = createCanvas(488, 400);
		const ctx = canvas.getContext('2d');
		const background = await loadImage(image).catch(() => {
			return message.channel.send('An error as occurred, please try again. Did you load a correct image?');
		});
		ctx.drawImage(background, 65, 30, 405, 280);
		const { body: buffer } = await superagent.get('https://cdn.discordapp.com/attachments/488483518742134794/542633779601342476/260293545019212.png');
		const bg = await loadImage(buffer);
		ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

		loadingmsg.delete();
		message.channel.send({files: [canvas.toBuffer()]}).catch(() => {
			message.channel.send('an error as occurred. Check the bot/channel permissions');
		});
	}
}

module.exports = paintCommand;