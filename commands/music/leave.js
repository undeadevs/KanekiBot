const commando = require('discord.js-commando');

class leaveChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Leaves a voice channel.',
            guildOnly: true
        });
    }

    async run(message, args)
    {
        if(args) return;
        if(message.guild.voiceConnection)
        {
            message.guild.voiceConnection.disconnect();
        }
        else
        {
            message.reply("I am already outside of the voice channel.");
        }
    }
}

module.exports = leaveChannelCommand;