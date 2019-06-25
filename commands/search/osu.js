const commando = require('discord.js-commando');
const discord = require('discord.js');

const dotenv = require('dotenv').config();

const OsuApiClient = require('easy-osu');
const osu = new OsuApiClient.Api(process.env.osuapikey, {
    resAsError: true // Reject on not found instead of returning nothing. (default: true)
});

class osuCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'osu',
            group: 'search',
            memberName: 'osu',
            description: 'Searchs through osu.',
            args: [
                {
                    key: 'username',
                    prompt:'Who do you want to search?',
                    type: 'string'
                },
                {
                    key: 'mode',
                    prompt:'What mode do yo want to search? [std/taiko/ctb/mania]',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { username, mode })
    {

        var valuemode;
        if(mode==`std`){valuemode=`0`}else
        if(mode==`taiko`){valuemode=`1`}else
        if(mode==`ctb`){valuemode=`2`}else
        if(mode==`mania`){valuemode=`3`}

        osu.getUser({u: username, m: valuemode}).then(user => {
            console.log(user);

            const osuEmbed = new discord.RichEmbed()
            .setTitle(`Info for: ${username}`)
            .addField(`Name :`, `${user.name}`,false)
            .addField(`URL :`, `${user.profileURL}`,false)
            .addField(`ID :`, `${user.id}`,false)
            .addField(`Performance Points :`, `${user.pp.pp}`,false)
            .addField(`Accuracy :`, `${user.accuracy}`,false)
            .addField(`SS+ :`, `${user.counts["SS+"]}`,false)
            .addField(`SS :`, `${user.counts["SS"]}`,false)
            .addField(`S+ :`, `${user.counts["S+"]}`,false)
            .addField(`S :`, `${user.counts["S"]}`,false)
            .addField(`A :`, `${user.counts["A"]}`,false)
            .setColor("#cc0000")
            .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL)
            .setImage(user.userAvatar);
            message.say(osuEmbed);
            
        }).catch(error=>{
            console.log(error);
            return message.say(`Invalid args.`);
        });
        
    }

}

module.exports = osuCommand;