const commando = require('discord.js-commando');
const discord = require('discord.js');

class banCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'ban',
            group: 'guild',
            memberName: 'ban',
            description: 'Bans member.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'member',
                    prompt:'Who do you want to ban?',
                    type: 'user'
                }
            ]
        });
    }

    async run(message, { member })
    {
        if(message.author==user) return message.say(`You can't ban yourself.`);
        message.guild.member(member).ban();
        await message.say(`Succesfully banned ${member}.`);
    }

}

module.exports = banCommand;