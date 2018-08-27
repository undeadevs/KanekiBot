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
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    label:'user',
                    prompt:'Please provide the user that you want to tickle.',
                    type: 'user'
                }
            ]
        });
    }

    async run(message, { user })
    {
        var chance = Math.floor(Math.random() * 5);
        if(user)
        {

            if(chance == 0)
            {
            message.channel.sendMessage('tickled ' + user, {files: ["./pics/tickled0.gif"]});
            }

            if(chance == 1)
            {
            message.channel.sendMessage('tickled ' + user, {files: ["./pics/tickled1.gif"]});
            }

            if(chance == 2)
            {
            message.channel.sendMessage('tickled ' + user, {files: ["./pics/tickled2.gif"]});
            }

            if(chance == 3)
            {
            message.channel.sendMessage('tickled ' + user, {files: ["./pics/tickled3.gif"]});
            }

            if(chance == 4)
            {
            message.channel.sendMessage('tickled ' + user, {files: ["./pics/tickled4.gif"]});
            }
        }else{message.channel.sendMessage(`${user} isn't a user.`);}
    }
}

module.exports = tickleCommand;