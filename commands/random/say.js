const commando = require('discord.js-commando');
const discord = require('discord.js');

class sayCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'say',
            group: 'random',
            memberName: 'say',
            description: 'Commands the bot to says something.'
        });
    }

    async run(message, args)
    {
        if(!args) return message.channel.sendMessage("Please add something you want to say as an argument.");
        message.channel.sendMessage(args);
    }

}

module.exports = sayCommand;