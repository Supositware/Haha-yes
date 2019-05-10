const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const { token, prefix, ownerID } = require('./config.json');
require('console-stamp')(console, '[HH:MM:ss]');


class hahaYesClient extends AkairoClient {
	constructor() {
		super({
			ownerID: ownerID,
		}, {
			disableEveryone: true
		});

		this.commandHandler = new CommandHandler(this, {
			directory: './commands/',
			prefix: prefix,
			commandUtil: true,
			commandUtilLifetime: 60000,
			allowMention: true,
			handleEdits: true,
			ignorePermissions: ownerID,
			ignoreCooldown: ownerID,
		});

		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: './event/inhibitors/',
			emitters: {
				process
			},
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: './event/listeners/'
		});

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler
		});

		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		
		this.listenerHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.commandHandler.loadAll();
	}
}

const client = new hahaYesClient();
client.login(token);