const commando = require('discord.js-commando');
const discord = require('discord.js');

class filterCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'filter',
            group: 'guild',
            memberName: 'filter',
            description: 'Commands the bot to says something.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'toggle',
                    prompt:'Filter Bad Words on/off?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { toggle })
    {
        if(toggle == `on`){ return test=true;}else
        if(toggle == `off`){ return test=false;}else{
            return message.say(`You can only choose either on or off.`);
        }
    }

}

module.exports = filterCommand;