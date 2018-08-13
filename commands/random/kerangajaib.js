const commando = require('discord.js-commando');

class kerangAjaib extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'apakah',
            group: 'random',
            memberName: 'apakah',
            description: 'Kerang Ajaib dari Spongebob.'
        });
    }

    async run(message, args)
    {
        if(!args) return message.channel.sendMessage("apakah apaan woy!")
        if(args == "saya ganteng?" | args == "saya ganteng")
        {
            message.channel.sendMessage("N G A R E P");
        }
        else
        {
            var chance = Math.floor(Math.random() * 2);
            if(chance == 0)
            {
                message.channel.sendMessage("ya");
            }
            else
            {
            message.channel.sendMessage("tidak");
            }
        }
    }
}

module.exports = kerangAjaib;