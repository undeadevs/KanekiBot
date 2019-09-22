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
        - Fixed music(play) command
        - Added bot info command
        - Added changelog command
        - Added invite command
        - Saved server(s) prefix even after bot restarted
        `)
        .setColor("#cc0000")
        .setFooter(`requested by: ${message.author.username}`, message.author.avatarURL);
        message.channel.sendMessage(bEmbed);
    }

}

module.exports = changelogCommand;