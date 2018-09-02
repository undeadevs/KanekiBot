const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
var fs = require('fs');
var ytdl = require('ytdl-core');
const yt = require('simple-youtube-api');

const {token, ownerID, adminID, prefix, googleapikey} = require("../../config.json");

const youtube = new yt(googleapikey);

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

        //adding the the songs to the queue

        try{
            var vInfo = await youtube.getVideo( url );
        }
        catch(error){
            try{
                var vSearch = await youtube.searchVideos(url,1);
                var vInfo = await youtube.getVideoByID( vSearch[0].id );
            }
            catch(err){
                message.say(`i couldn't obtain any search result.`);
            }
        }

        //var vInfo = await youtube.getVideo( url );
        //console.log(video);
        //var vInfo = await ytdl.getInfo( url );

        if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
    
        var vid = {
            url: `https://www.youtube.com/watch?v=${vInfo.id}`, 
            title: vInfo.title, 
            img: vInfo.thumbnails.maxres.url, 
            channel: vInfo.channel.title, 
            desc: vInfo.description, 
            requester: message.author.username};

        queue[message.guild.id].songs.push(vid);
        message.channel.sendMessage(`**${vid.title}** has been added to the queue.`).then(runPlay());//wait until the song added to the queue and then play the songs

        //function that play the songs
        async function runPlay(){
		queue[message.guild.id].playing = true;

        console.log(queue);
        
        if(!message.guild.voiceConnection){message.member.voiceChannel.join().then(function(connection){
            play(message.guild.voiceConnection, queue[message.guild.id].songs.shift());
        });}

		async function play(connection, song) {
            console.log(song);

			if (song === undefined) return message.channel.sendMessage('Queue finished.').then(() => {
				queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
            });

            var sSEmbed = new RichEmbed()
            .setAuthor(`Now playing: ${song.title}`)
            .setDescription([`**Link:** ${song.url}`, `**Channel**: ${song.channel}`].join(`\n`))
            .setImage(song.img)
            .setFooter(`requested by: ${song.requester}`, message.author.avatarURL);
            message.channel.sendEmbed(sSEmbed);

            //ytdl(song.url, {quality: 'highest'}).pipe(fs.createWriteStream((`./vids/${vInfo.id}.mp4`)));
            
            queue[message.guild.id].dispatcher = connection.playStream(ytdl(song.url, {filter: 'audioonly', quality: 'highestaudio'}));
            
			queue[message.guild.id].dispatcher.on('end', () => {
                play(connection, queue[message.guild.id].songs.shift());
            });
        }
        }
        
    }
}

module.exports = playCommand;