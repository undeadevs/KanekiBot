const commando = require('discord.js-commando');
const discord = require('discord.js');
const dotenv = require('dotenv').config();

class inviteCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'invite',
            group: 'nerai',
            memberName: 'invite',
            description: 'Shows link to invite bot.'
        });
    }

    async run(message, args)
    {
        const bEmbed = new discord.RichEmbed()
        .setAuthor(`To have me join your server please click the link below:`)
        .setDescription(`
        https://discordapp.com/oauth2/authorize?client_id=478376842248716291&scope=bot&permissions=2146958847
        `)
        .setColor("#cc0000")
        .setFooter(`requested by: ${message.author.username}`, message.author.avatarURL);
        message.channel.sendMessage(bEmbed);
    }

}

module.exports = inviteCommand;