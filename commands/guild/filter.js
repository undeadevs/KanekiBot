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
            description: 'Filters bad words.',
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
        console.log(global.test);
        if(toggle == `on`){ return global.test = true;}else
        if(toggle == `off`){ return global.test = false;}else{
            return message.say(`You can only choose either on or off.`);
        }
    }

}

module.exports = filterCommand;