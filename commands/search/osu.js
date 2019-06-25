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

        osu.getUser({u: username, m: mode}).then(user => {
            console.log(user);

            const osuEmbed = new discord.RichEmbed()
            .setAuthor(`Info for: ${user.name}`)
            .setDescription(`
            URL: ${user.profileURL}
            ID: ${user.id}
            PP: ${user.pp.pp}
            ACC: ${user.accuracy}`)
            .setImage(user.userAvatar);
            
        }).catch(error=>{return message.say(`Invalid args.`);});
        
    }

}

module.exports = osuCommand;