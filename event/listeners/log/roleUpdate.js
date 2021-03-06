/* TODO
 * Show more details about the update like what permissions changed, if a name change occurred ect...
 */
const { Listener } = require('discord-akairo');
const LogStats = require('../../../models/').LogStats;

class roleUpdateListener extends Listener {
	constructor() {
		super('roleUpdate', {
			emitter: 'client',
			event: 'roleUpdate'
		});
	}

	async exec(oldRole, newRole) {
		if (oldRole === newRole || oldRole.rawPosition !== newRole.rawPosition) return;
		const guild = oldRole.guild;
		const logStats = await LogStats.findOne({where: {guild: guild.id}});
		if (logStats) {
			const fetchedLogs = await guild.fetchAuditLogs({
				limit: 1,
				type: 'ROLE_UPDATE',
			});

			const creationLog = fetchedLogs.entries.first();

			const channel = this.client.channels.resolve(await logStats.get('channel'));
			let Embed = this.client.util.embed()
				.setColor('NAVY')
				.setTitle('Role updated')
				.setDescription(`${oldRole.name} got updated!`)
				.setTimestamp();

			if (!creationLog) return channel.send(Embed);

			Embed.setDescription(`${oldRole.name} got updated by ${creationLog.executor}`);

			channel.send(Embed);
		}
	}
}
module.exports = roleUpdateListener;
