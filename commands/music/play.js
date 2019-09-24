const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
var fs = require('fs');
var ytdl = require('ytdl-core-discord');
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

        //adding the the songs to the queue

        var pls = false

        try{
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                pls = true;
                var playlist = await youtube.getPlaylist(url);
                var videos = await playlist.getVideos();
			    for (var vInfo of Object.values(videos)) {
                    var vInfo2 = await youtube.getVideoByID(vInfo.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(vInfo2);
                    console.log(vInfo2);
			    }
			    message.say(`**${playlist.title}** has been added to the queue.`);
            }else{
                var vInfo = await youtube.getVideo( url );
                await handleVideo(vInfo);
            }
        }
        catch(error){
            try{
                // message.awaitMessages()
                var vSearch = await youtube.searchVideos(url,10);
                let index = 0;
                var searchEmbed = new RichEmbed()
                    .setTitle(`__**Songs Selection:**__`)
                    .setColor("#cc0000")
                    .setDescription(`\`\`\`md
${vSearch.map(video2 => `${++index}. ${video2.title}`).join(`\n`)}\`\`\`
Please provide a value to select one of the search results ranging from 1 - 10
`);
message.say(searchEmbed);
                /*message.channel.send(`
__**Songs Selection:**__
\`\`\`${vSearch.map(video2 => `${++index}. ${video2.title}`).join(`\n`)}\`\`\`
Please provide a value to select one of the search results ranging from 1 - 10
`);*/
                try {
                    var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                }
                catch (e){
                    console.error(e);
                    return message.say('No or invalid value entered, cancelling video selection.');
                }

                const videoIndex = parseInt(response.first().content);
                var vInfo = await youtube.getVideoByID( vSearch[videoIndex-1].id );
                await handleVideo(vInfo);
            }
            catch(err){
                message.say(`i couldn't obtain any search result.`);
            }
        }

        //var vInfo = await youtube.getVideo( url );
        //console.log(video);
        //var vInfo = await ytdl.getInfo( url );

        async function handleVideo(vInfo){
        if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].paused = false, queue[message.guild.id].leaving = false, queue[message.guild.id].songs = [];
    
        var vid = {
            url: `https://www.youtube.com/watch?v=${vInfo.id}`, 
            title: vInfo.title, 
            img: vInfo.thumbnails.high.url, 
            channel: vInfo.channel.title, 
            desc: vInfo.description, 
            requester: message.author.username};

        queue[message.guild.id].songs.push(vid);
        if(pls===true) {return runPlay();}
        
        else {
        let qpos = [];

        queue[message.guild.id].songs.forEach((song, i) => { qpos.push(`${i+1}`);});
        qpos = String(qpos);
        const qp = qpos.split(",");
        message.channel.sendMessage(`**${vid.title}** has been added to the queue position **${qp[qp.length-1]}**.`).then(runPlay());//wait until the song added to the queue and then play the songs
        }
        }

        //function that play the songs
        async function runPlay(){
		queue[message.guild.id].playing = true;

        console.log(queue);
        
        if(!message.guild.voiceConnection){message.member.voiceChannel.join().then(function(connection){
            play(message.guild.voiceConnection, queue[message.guild.id].songs[0]);
        });}}

		async function play(connection, song) {
            console.log(song);

			if (song === undefined) return message.channel.sendMessage('Queue finished.').then(() => {
				queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
            });

            if(queue[message.guild.id].leaving===true){
            }else{
            var sSEmbed = new RichEmbed()
            .setAuthor(`Playing: ${song.title}`)
            .setDescription(`
**Link:** ${song.url}
**Channel**: ${song.channel}`
)
            .setImage(song.img)
            .setColor("#cc0000")
            .setFooter(`requested by: ${song.requester}`, message.author.avatarURL);
            message.channel.sendEmbed(sSEmbed);
            }

            //ytdl(song.url, {quality: 'highest'}).pipe(fs.createWriteStream((`./vids/${vInfo.id}.mp4`)));
            
            queue[message.guild.id].dispatcher = connection.playOpusStream(await ytdl(song.url));

			queue[message.guild.id].dispatcher.on('end', () => {
                queue[message.guild.id].songs.shift();
                play(connection, queue[message.guild.id].songs[0]);
            });

        }
        
    }
}

module.exports = playCommand;