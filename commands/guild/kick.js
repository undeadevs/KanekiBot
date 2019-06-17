const commando = require('discord.js-commando');
const discord = require('discord.js');

class kickCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'kick',
            group: 'guild',
            memberName: 'kick',
            description: 'Kicks member.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'member',
                    prompt:'Who do you want to kick?',
                    type: 'user'
                }
            ]
        });
    }

    async run(message, { member })
    {
        if(message.author==user) return message.say(`You can't kick yourself.`);
        message.guild.member(member).kick();
        await message.say(`Succesfully kicked ${member}.`);
    }

}

module.exports = kickCommand;