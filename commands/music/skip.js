const commando = require('discord.js-commando');
var fs = require('fs');
var ytdl = require('ytdl-core');
const yt = require('simple-youtube-api');

const {token, ownerID, adminID, prefix, googleapikey} = require("../../config.json");

const youtube = new yt(googleapikey);

class skipCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            aliases: ['s'],
            description: 'Skips current playing music.',
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
            if(squeue.dispatcher){
                message.say(`Song skipped.`)
                squeue.dispatcher.end();
            }
        }
        else
        {
            message.reply("You can't skip anything if i'm outside of the voice channel.");
        }
    }
}

module.exports = skipCommand;