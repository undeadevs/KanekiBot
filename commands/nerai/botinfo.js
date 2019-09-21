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
        .setAuthor(`NeraiBot`)
        .setDescription(`
        This bot has multiple purposes.
        Library: discord.js-commando
        Created by: ${this.client.users.get(`${process.env.ownerID}`).username}, and ${this.client.users.get(`${process.env.adminID0}`).username}
        `)
        .setImage(this.client.user.avatarURL)
        .setColor("#cc0000")
        .setFooter(`requested by: ${message.author.username}`, message.author.avatarURL);
        message.channel.sendMessage(bEmbed);
    }

}

module.exports = botInfoCommand;