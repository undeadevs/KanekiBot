const commando = require('discord.js-commando');
const discord = require('discord.js');

class renameChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'renamechannel',
            group: 'guild',
            memberName: 'renamechannel',
            description: 'Renames channel name.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'channels1',
                    prompt:'What channel do you want to delete the message?',
                    type: 'channel'
                },
                {
                    key: 'channels2',
                    prompt:'What do you want to rename it to?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { channels1, channels2 })
    {
        let c = message.member.guild.channels.find("name", channels1.name).setName(channels2);
        await message.channel.sendMessage(`Renamed ${channels1.name} to ${channels2}.`);
    }

}

module.exports = renameChannelCommand;