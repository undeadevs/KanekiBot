const commando = require('discord.js-commando');
const discord = require('discord.js');
const dotenv = require('dotenv').config();

class botInfoCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'botinfo',
            group: 'nerai',
            memberName: 'botinfo',
            description: 'Shows Bot Info.'
        });
    }

    async run(message, args)
    {
        const bEmbed = new discord.RichEmbed()
        .setAuthor(`Nerai`, this.client.user.avatarURL)
        .addField(`Library`, `discord.js-commando`, true)
        .addField(`Website`, `[neraibot.wixsite.com](https://neraibot.wixsite.com/neraibot)`, true)
        .addField(`Github`, `[NeraiBot](https://github.com/undeadevs/NeraiBot)`, true)
        .addField(`Servers`, this.client.guilds.size)
        .addField(`Devs`, `${this.client.users.get(`${process.env.ownerID}`).tag}
        ${this.client.users.get(`${process.env.adminID0}`).tag}`, true)
        .setColor("#cc0000")
        .setFooter(`requested by: ${message.author.username}`, message.author.avatarURL);
        message.channel.sendMessage(bEmbed);
    }

}

module.exports = botInfoCommand;