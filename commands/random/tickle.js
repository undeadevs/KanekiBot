const commando = require('discord.js-commando');

class tickleCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'tickle',
            group: 'random',
            memberName: 'tickle',
            description: 'Tickles a user.',
            guildOnly: true
        });
    }

    async run(message, args)
    {
        var mention = message.mentions.users.first();
        var chance = Math.floor(Math.random() * 5);
        if(!args) return message.channel.sendMessage(`Please provide a mention of the user that you want to tickle.`);
        if(args == mention)
        {

            if(chance == 0)
            {
            message.channel.sendMessage('tickled ' + mention, {files: ["./pics/tickled0.gif"]});
            }

            if(chance == 1)
            {
            message.channel.sendMessage('tickled ' + mention, {files: ["./pics/tickled1.gif"]});
            }

            if(chance == 2)
            {
            message.channel.sendMessage('tickled ' + mention, {files: ["./pics/tickled2.gif"]});
            }

            if(chance == 3)
            {
            message.channel.sendMessage('tickled ' + mention, {files: ["./pics/tickled3.gif"]});
            }

            if(chance == 4)
            {
            message.channel.sendMessage('tickled ' + mention, {files: ["./pics/tickled4.gif"]});
            }
        }else{message.channel.sendMessage(`${args} isn't a user.`);}
    }
}

module.exports = tickleCommand;