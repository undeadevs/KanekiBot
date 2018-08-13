const commando = require('discord.js-commando');
var fs = require('fs');
var ytdl = require('ytdl-core');

function Play(connection, message)
{

    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));
    server.queue.shift();
    server.dispatcher.on('end', function()
    {

        if(server.queue[0])
        {
            Play(connection, message);
        }
        else
        {
            connection.disconnect();
        }

    });

}

class playCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Plays music.',
            guildOnly: true
        });
    }

    async run(message, args)
    {

        var server = servers[message.guild.id];
        if(!args){message.reply("Please provide a link."); return;}

        if(!message.member.voiceChannel)
        {
            message.reply("You need to join a voice channel.");
        }

        if(!servers[message.guild.id]){servers[message.guild.id] = {
            queue: []
        };
        }

        server.queue.push(args);

        if(!message.guild.voiceConnection){message.member.voiceChannel.join().then(function(connection){
            Play(connection, message);
        });}

    }

}

module.exports = playCommand;