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
            guildOnly: true
        });
    }

    async run(message, args)
    {
        if(!args) return message.channel.sendMessage(`Please suggest something.`);
        var sc = message.member.guild.channels.find("name", "suggestions");
        sc.sendMessage(`*${message.author} suggested ${args}*`);
        console.log(`@${message.author.tag} suggested ${args}`);
    }

}

module.exports = suggestCommand;