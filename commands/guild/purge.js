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
            args: [
                {
                    key: 'number',
                    prompt:'How many messages do you want to delete?',
                    type: 'float'
                }
            ]
        });
    }

    async run(message, args)
    {
        if(!args) return;
        message.channel.bulkDelete(args.number);
        await message.channel.sendMessage(`Deleted ${args.number} messages.`);}

}

module.exports = purgeCommand;