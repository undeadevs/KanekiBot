const commando = require('discord.js-commando');
var fs = require('fs');
var ytdl = require('ytdl-core');

class setVolumeCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'volume',
            group: 'music',
            memberName: 'volume',
            description: 'Sets music volume.',
            guildOnly: true
        });
    }

    async run(message, args)
    {
        if(args) return;
        if(message.guild.voiceConnection)
        {
            var server = servers[message.guild.id];
            if(args==isNaN) return message.channel.sendMessage(`${args} is not a number.`);
            var volume = args/100;
            if(server.dispatcher){server.dispatcher.setVolume(volume);}
        }
        else
        {
            message.reply("I am outside of the voice channel.");
        }
    }
}

module.exports = setVolumeCommand;