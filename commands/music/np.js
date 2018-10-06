const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
var fs = require('fs');
var ytdl = require('ytdl-core');
const yt = require('simple-youtube-api');

const {token, ownerID, adminID, prefix, googleapikey} = require("../../config.json");

const youtube = new yt(googleapikey);

class npCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'nowplaying',
            group: 'music',
            memberName: 'nowplaying',
            aliases: ['np'],
            description: 'Shows currently playing music.',
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
            var npEmbed = new RichEmbed()
            .setDescription(`Now playing: \`${queue[message.guild.id].songs[0].title}\` - Requested by: \`${queue[message.guild.id].songs[0].requester}\``);
            message.channel.sendEmbed(npEmbed);
        }
        else
        {
            message.reply("You can't use this command if i'm outside of the voice channel.");
        }
    }
}

module.exports = npCommand;