const commando = require('discord.js-commando');

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
            queue[message.guild.id].leaving = true;
            async function stopfunc(){
                var i;
                for (i = 0; i < queue[message.guild.id].songs.length; i++) { 
                    queue[message.guild.id].dispatcher.end();
                }
            }
            message.say(`Stopping songs...`);
            stopfunc().then(message.guild.voiceConnection.disconnect());
        }
        else
        {
            message.reply("I am already outside of the voice channel.");
        }
    }
}

module.exports = leaveChannelCommand;