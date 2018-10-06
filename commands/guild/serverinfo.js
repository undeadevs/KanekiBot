const commando = require('discord.js-commando');
const discord = require('discord.js');

function checkBots(guild) {
    let botCount = 0; // This is value that we will return
    guild.members.forEach(member => { // We are executing this code for every user that is in guild
        if(member.user.bot) botCount++; // If user is a bot, add 1 to botCount value
    });
    return botCount; // Return amount of bots
  }

function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
        if(!member.user.bot) memberCount++; // If user isn't bot, add 1 to value. 
    });
    return memberCount;
  }
  
class serverInfoCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'server-info',
            aliases: [`sinfo`, `info-server`],
            group: 'guild',
            memberName: 'serverinfo',
            description: 'Shows server info.',
            guildOnly: true
        });
    }
  
    async run(message, args)
    {

        let sIEmbed = new discord.RichEmbed()
        .setAuthor(`${message.guild.name} - Informations`, message.guild.iconURL) // Will set text on top of embed to <guild name> - Informations, and will place guild icon next to it
        .addField('Server owner', message.guild.owner, true) // Will add in-line field with server owner
        .addField('Server region', `${String(message.guild.region).charAt(0).toUpperCase()}${String(message.guild.region).slice(1)}`, false) // Will add in-line field with server region
        .addField('Channel count', message.guild.channels.size, false) // Will add in-line field with total channel count
        .addField('Total member count', message.guild.memberCount, false) // Will add in-line field with total member count
        // Now we will use our methods that we've created before
        .addField('Users', checkMembers(message.guild), false)
        .addField('Bots', checkBots(message.guild), false)
        // And now, we can finally add footer and timestamp
        .setFooter('Guild created at:')
        .setTimestamp(message.guild.createdAt); // Will set timestamp to date when guild was created

        // And now we can send our embed
        message.say(sIEmbed);

    }
  
}
  
module.exports = serverInfoCommand;