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
            userPermissions: ['ADMINISTRATOR'],
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
                },
                {
                    key: 'reportch',
                    prompt:'Set your report channel!',
                    type: 'string',
                    default: 'report'
                }
            ]
        });
    }

    async run(message, { user, reason , reportch})
    {

        if(!user) return;
        if(message.author==user) return message.say(`You can't report yourself.`);

        var rEmbed = new discord.RichEmbed()
            .setColor("#cc0000")
            .setDescription(`__***--${user} has been reported--***__ \n**REPORTER:** ${message.author} \n**TIME**: ${message.createdAt} \n**REASON**: ${reason} \n**-------------------------------------**`)

        var rc = message.member.guild.channels.find("name", reportch);
        //var mtc = message.member.guild.categories.find("name", "mod-text channel");
        if(!rc) return message.say('Please set your report channel at the end of the command.');
        //await sc.sendMessage(`--${args.user} has been reported-- \nREPORTER: ${message.author} \nTIME: ${message.createdAt} \nREASON: ${args.reason}`);
        await rc.sendMessage(rEmbed);
    }

}

module.exports = reportCommand;