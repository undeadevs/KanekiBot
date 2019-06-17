const commando = require('discord.js-commando');
const discord = require('discord.js');

class suggestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'suggest',
            group: 'guild',
            memberName: 'suggest',
            description: 'Commands the bot to says something',
            guildOnly: true,
            args: [
                {
                    key: 'suggestion',
                    prompt:'Please suggest something.',
                    type: 'string'
                },
                {
                    key: 'suggestionch',
                    prompt:'Set your suggestion channel!',
                    type: 'string',
                    default: 'suggestions'
                }
            ]
        });
    }

    async run(message, {suggestion, suggestionch})
    {
        if(!suggestion) return;
        var sc = message.member.guild.channels.find("name", suggestionch);
        if(!sc) return message.say('Please set your suggestion channel at the end of the command.');
        sc.sendMessage(`*${message.author} suggested ${suggestion}*`);
        console.log(`@${message.author.tag} suggested ${suggestion}`);
    }

}

module.exports = suggestCommand;