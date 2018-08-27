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
            args: [
                {
                    key: 'channel',
                    prompt:'What channel do you want to delete the message?',
                    type: 'string'
                },
                {
                    key: 'number',
                    prompt:'How many messages do you want to delete?',
                    type: 'float'
                }
            ]
        });
    }

    async run(message, { channel, number })
    {
        if(number>100) return message.channel.sendMessage("You can't delete messages more than 100.");
        let c = message.member.guild.channels.find("name", channel);
        c.bulkDelete(number);
        await message.channel.sendMessage(`Deleted ${number} messages on ${channel}.`);
    }

}

module.exports = purgeChannelCommand;