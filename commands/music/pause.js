const commando = require('discord.js-commando');
var fs = require('fs');

class pauseCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            aliases: ['⏸'],
            description: 'Pauses current playing music.',
            guildOnly: true
        });
    }

    async run(message, args)
    {
        if(!message.member.voiceChannel)
        {
            return message.reply("You need to join a voice channel to use this command.");
        }

        if(message.guild.voiceConnection)
        {
            var squeue = queue[message.guild.id];
            if(!squeue) message.say('There is nothing to pause.');
            if(squeue.dispatcher){
                queue[message.guild.id].paused = true;
                message.say(`Song paused.`)
                squeue.dispatcher.pause();
            }
        }
        else
        {
            message.reply("You can't pause anything if i'm outside of the voice channel.");
        }
    }
}

module.exports = pauseCommand;