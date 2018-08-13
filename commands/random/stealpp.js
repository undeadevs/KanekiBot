const commando = require('discord.js-commando');
const discord = require('discord.js');

class stealPPCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'stealpp',
            group: 'random',
            memberName: 'stealpp',
            description: 'Steals someone Profile Pic.'
        });
    }

    async run(message, args)
    {
        var mention = message.mentions.users.first();
        if(!args) return message.channel.sendMessage(`Please provide a mention of the user.`);
        if(args == mention) message.channel.sendMessage(mention.avatarURL); else message.channel.sendMessage(`${args} isn't a user.`);
    }
}

module.exports = stealPPCommand;