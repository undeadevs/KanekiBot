const commando = require('discord.js-commando');
const discord = require('discord.js');

class myPPCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'mypp',
            group: 'random',
            memberName: 'mypp',
            description: 'Shows my Profile Pic.'
        });
    }

    async run(message, args)
    {
        if(args) return;
        message.channel.sendMessage(message.author.avatarURL);
    }
}

module.exports = myPPCommand;