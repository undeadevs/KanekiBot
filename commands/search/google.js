const commando = require('discord.js-commando');
const discord = require('discord.js');
var google = require('google');

class googleCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'google',
            group: 'search',
            memberName: 'google',
            description: 'Searchs something on google.',
            args: [
                {
                    key: 'text',
                    prompt:'What do you want to search?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { text })
    {
        google.resultsPerPage = 2;
        google(text, function (err, res){
            if(err) return message.say(`No result for: ${text}`);
           
            for (var i = 0; i < res.links.length; ++i) {
              var link = res.links[i];
            if (!link.href | link === undefined) {
                res.next;
            } else {

              const gEmbed = new discord.RichEmbed()
                    //.setAuthor(`Showing search result for: ${text}`)
                    .setAuthor(`Showing search result for: ${text}`)
                    .setTitle(`[${link.title}](${link.href})`)
                    .setDescription(`Description: ${link.description}`);
              message.say(gEmbed);
            }
            }
           
        });
    }

}

module.exports = googleCommand;