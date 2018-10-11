var animeQuotes = require('animequotes');

const commando = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

class aQuoteCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'animequote',
            aliases: ['anime-quote'],
            group: 'fun',
            memberName: 'animequote',
            description: 'Shows random anime quotes.'
        });
    }

    async run(message, args)
    {
        var aq = animeQuotes.randomQuote();

    var qs = aq.quote;
    var qc = aq.name;
    var qa = aq.anime;
        const qEmbed = new RichEmbed()
            .setDescription(`
*\"${aq.quote}\"*
**-${aq.name} [${aq.anime}]**
`);
        message.channel.sendMessage(qEmbed);
    }

}

module.exports = aQuoteCommand;