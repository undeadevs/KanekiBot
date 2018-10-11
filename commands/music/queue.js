const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
var fs = require('fs');

class queueCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            aliases: ['q'],
            description: 'Shows music queue.',
            guildOnly: true
        });
    }

    async run(message, args)
    {

        if(!message.member.voiceChannel)
        {
            return message.reply("You need to join a voice channel to use this command.");
        }

        if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`There is nothing in the queue.`);

        let tosend = [];

        queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});

        var sQEmbed = new RichEmbed()
            .setTitle(`__**${message.guild.name}'s Music Queue:**__`)
            .setDescription(`${(tosend.length > 15 ? '*[Only 15 shown]*' : '')}\n\`\`\`md
${tosend.slice(0,15).join('\n')}
\`\`\``);

        if(tosend.length==0) return message.say("There is nothing in the queue.");

        message.say(sQEmbed);

    }
}

module.exports = queueCommand;