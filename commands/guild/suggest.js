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
                }
            ]
        });
    }

    async run(message, args)
    {
        var suggestion = args.suggestion;
        if(!args) return;
        var sc = message.member.guild.channels.find("name", "suggestions");
        if(!sc) return;
        sc.sendMessage(`*${message.author} suggested ${suggestion}*`);
        console.log(`@${message.author.tag} suggested ${suggestion}`);
    }

}

module.exports = suggestCommand;