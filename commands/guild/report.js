const commando = require('discord.js-commando');
const discord = require('discord.js');

class reportCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'report',
            group: 'guild',
            memberName: 'report',
            description: 'Commands the bot to says something.',
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt:'Who do you want to report?',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt:'Why do you want to report?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, args)
    {

        if(!args) return;

        var rEmbed = new discord.RichEmbed()
            .setDescription(`__***--${args.user} has been reported--***__ \n**REPORTER:** ${message.author} \n**TIME**: ${message.createdAt} \n**REASON**: ${args.reason} \n**-------------------------------------**`)

        var rc = message.member.guild.channels.find("name", "report");
        //var mtc = message.member.guild.categories.find("name", "mod-text channel");
        if(!rc) return;
        //await sc.sendMessage(`--${args.user} has been reported-- \nREPORTER: ${message.author} \nTIME: ${message.createdAt} \nREASON: ${args.reason}`);
        await sc.sendMessage(rEmbed);
    }

}

module.exports = reportCommand;