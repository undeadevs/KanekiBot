const commando = require('discord.js-commando');
const discord = require('discord.js');

class sayCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'say',
            group: 'random',
            memberName: 'say',
            description: 'Commands the bot to says something.',
            args: [
                {
                    key: 'text',
                    prompt:'Please add something you want the bot to say.',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { text })
    {
        message.channel.sendMessage(text);
    }

}

module.exports = sayCommand;