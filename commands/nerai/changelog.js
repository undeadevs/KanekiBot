const commando = require('discord.js-commando');
const discord = require('discord.js');
const dotenv = require('dotenv').config();

class changelogCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'changelog',
            group: 'nerai',
            memberName: 'changelog',
            description: 'Shows Bot Changelogs.'
        });
    }

    async run(message, args)
    {
        const bEmbed = new discord.RichEmbed()
        .setAuthor(`Changelog(s)`)
        .setDescription(`
        - Fixed mal command
        - Twitter command no longer working
        `)
        .setColor("#cc0000")
        .setFooter(`requested by: ${message.author.username}`, message.author.avatarURL);
        message.channel.sendMessage(bEmbed);
    }

}

module.exports = changelogCommand;