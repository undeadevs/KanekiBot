const commando = require('discord.js-commando');
const discord = require('discord.js');

class purgeCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'purge',
            group: 'guild',
            memberName: 'purge',
            description: 'Deletes message.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'number',
                    prompt:'How many messages do you want to delete?',
                    type: 'float'
                }
            ]
        });
    }
    
    async run(message, { number })
    {

        if(number>100) return message.channel.sendMessage("You can't delete messages more than 100.");
        const fetched = await message.channel.fetchMessages({limit: number});
        message.channel.bulkDelete(fetched);
        await message.channel.sendMessage(`Deleted ${fetched.size} messages.`);
    }

}

module.exports = purgeCommand;