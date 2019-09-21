const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
var fs = require('fs');
var ytdl = require('ytdl-core');
const yt = require('simple-youtube-api');

const dotenv = require('dotenv').config();

const youtube = new yt(process.env.googleapikey);

function TextAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}

class playCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'play',
            group: 'music',
            memberName: 'play',
            aliases: ['p'],
            description: 'Plays music.',
            guildOnly: true,
            args: [
                {
                    key: 'url',
                    prompt:'Please provide a the title of the you want to play or a link to that video.',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { url })
    {

        //users need to be in a voice channel
        if(!message.member.voiceChannel)
        {
            return message.reply("You need to join a voice channel to use this command.");
        }

        const streamOptions = { seek: 0, volume: 1 };
        var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection => {
            console.log("joined channel");
            const stream = ytdl(url, { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on("end", end => {
                console.log("left channel");
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
     
    }
}

module.exports = playCommand;