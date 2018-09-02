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
        if(!this.client.isOwner(message.author)) return;
        if(number>100) return message.channel.sendMessage("You can't delete messages more than 100.");
        var num = number;
        message.channel.bulkDelete(num);
        await message.channel.sendMessage(`Deleted ${number} messages.`);
    }

}

module.exports = purgeCommand;