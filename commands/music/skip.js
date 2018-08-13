const commando = require('discord.js-commando');
var fs = require('fs');
var ytdl = require('ytdl-core');

class skipCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skips music that is playing.',
            guildOnly: true
        });
    }

    async run(message, args)
    {
        if(args) return;
        if(message.guild.voiceConnection)
        {
            var server = servers[message.guild.id];
            if(server.dispatcher){server.dispatcher.end();}
        }
        else
        {
            message.reply("I am outside of the voice channel.");
        }
    }
}

module.exports = skipCommand;