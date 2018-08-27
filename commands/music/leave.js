const commando = require('discord.js-commando');

const {token, ownerID, adminID, prefix, googleapikey} = require("../../config.json");

class leaveChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            aliases: ['l'],
            description: 'Leaves a voice channel.',
            guildOnly: true
        });
    }

    async run(message, args)
    {
        if(!message.member.voiceChannel)
        {
            return message.reply("You need to join a voice channel to use this command.");
        }
        
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