const commando = require('discord.js-commando');
const discord = require('discord.js');

class purgeChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'purgechannel',
            group: 'guild',
            memberName: 'purgechannel',
            description: 'Deletes message on a spesific channel.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'channels',
                    prompt:'What channel do you want to delete the message?',
                    type: 'channel'
                },
                {
                    key: 'number',
                    prompt:'How many messages do you want to delete?',
                    type: 'float'
                }
            ]
        });
    }

    async run(message, { channels, number })
    {
        if(number>100) return message.channel.sendMessage("You can't delete messages more than 100.");
        const fetched = await message.channel.fetchMessages({limit: number});
        let c = message.member.guild.channels.find("name", channels.name);
        c.bulkDelete(number);
        await message.channel.sendMessage(`Deleted ${fetched.size} messages on ${channels.name}.`);
    }

}

module.exports = purgeChannelCommand;