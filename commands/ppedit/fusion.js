const Command = require('../../structures/Command');
const Jimp = require('jimp');

module.exports = class AvatarFusionCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blend',
			aliases: ['fusion', 'fuse'],
			group: 'ppedit',
			memberName: 'blend',
			description: 'Blends 2 user\'s avatars together.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'overlay',
					prompt: 'Which user would you like to put over the base?',
					type: 'user'
				},
				{
					key: 'base',
					prompt: 'Which user would you like to be the base?',
					type: 'user'
				}
			]
		});
	}

	async run(message, { overlay, base }) {
		const baseAvatarURL = base.avatarURL;
		const overlayAvatarURL = overlay.avatarURL;
        
        Jimp.read(String(overlayAvatarURL)).then(overlay => {
			overlay.resize(512, Jimp.AUTO);
			overlay.opacity(0.5);
            Jimp.read(String(baseAvatarURL)).then(image => {
                image.resize(512, Jimp.AUTO);
                image.opacity(0.9);
				image.composite(overlay, 0, 0, Jimp.BLEND_SOURCE_OVER, err =>{if(err) return message.say(`ERR: ${err}`)});
				image.write(`./pics/ppedit/avablend.png`);
				return message.say({file: `./pics/ppedit/avablend.png`});
            });
        });

	}
};
