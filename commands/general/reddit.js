const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class RedditCommand extends Command {
    constructor() {
        super('reddit', {
            aliases: ['reddit'],
            category: 'general',
            split: 'none',
            args: [
                {
                    id: 'sub',
                    type: 'string'
                }
            ],
            description: {
				content: 'Send random images from the subreddit you choose',
				usage: '[subreddit]',
				examples: ['2meirl4meirl']
			}
        });
    }

    async exec(message, args) {
        let sub = args.sub;
        
        fetch('https://www.reddit.com/r/' + sub + '.json?limit=100').then((response) => {
            return response.json();
        }).then((response) => { 
            if (!response.data)
                return message.channel.send('Not a valid subreddit')
            while (response.data.children[i].data.post_hint !== 'image') {
                i = Math.floor((Math.random() * response.data.children.length));
        
                a++
                if (a == 5)
                    return message.channel.send("Could not find any images")
            }
                if (response.data.children[i].data.over_18 == true)
                    return message.channel.send(`No nsfw ( if you want a nsfw version of this commands use the feedback commands "${prefix} feedback <your feedback>")`)
                const redditEmbed = new Discord.RichEmbed()
                .setColor("#ff9900")
                .setTitle(response.data.children[i].data.title)
                .setImage(response.data.children[i].data.url)
                .setURL('https://reddit.com' + response.data.children[i].data.permalink)
                .setFooter(`⬆ ${response.data.children[i].data.ups}     💬 ${response.data.children[i].data.num_comments}`)
                
                message.channel.send(redditEmbed);
            })
    }
}
module.exports = RedditCommand;