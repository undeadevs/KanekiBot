const commando = require('discord.js-commando');
const discord = require('discord.js');

class stealPPCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'stealpp',
            group: 'fun',
            memberName: 'stealpp',
            description: 'Steals someone Profile Pic.',
            args: [
                {
                    key: 'user',
                    prompt:'Please provide a mention of the user.',
                    type: 'user'
                }
            ]
        });
    }

    async run(message, { user })
    {
        if(user) message.channel.sendMessage(user.avatarURL); else message.channel.sendMessage(`${user} isn't a user.`);
    }
}

module.exports = stealPPCommand;