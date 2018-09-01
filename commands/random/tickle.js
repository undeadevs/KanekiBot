const commando = require('discord.js-commando');
const discord = require('discord.js');

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
        var pictures = ["./pics/tickled0.gif", "./pics/tickled1.gif", "./pics/tickled2.gif", "./pics/tickled3.gif", "./pics/tickled4.gif"];
        var pic = pictures[Math.floor(Math.random() * pictures.length)];
        if(user)
        {

            message.say(`Tickled ${user}.`, {files: [pic]});

        }else{message.channel.sendMessage(`${user} isn't a user.`);}
    }
}

module.exports = tickleCommand;