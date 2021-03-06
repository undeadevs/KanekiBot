const commando = require('discord.js-commando');
var fs = require('fs');

class pauseCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            aliases: ['r'],
            description: 'Resumes current paused music.',
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
            if(!squeue) return message.say(`There is nothing to resume.`);
            if(queue[message.guild.id].paused === false) return message.say(`There is no paused music to resume.`);
            queue[message.guild.id].paused = false;
            if(squeue.dispatcher){
                message.say(`Song resumed.`);
                squeue.dispatcher.resume();
            }
        }
        else
        {
            message.reply("You can't resume anything if i'm outside of the voice channel.");
        }
    }
}

module.exports = pauseCommand;