const commando = require('discord.js-commando');
const discord = require('discord.js');
const fs = require('fs');

class restartCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'rs',
            group: 'util',
            memberName: 'rs',
            description: 'Restarts the bot.'
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);
    }

    async run(message, args)
    {
        const re = require('../../nothing.json');
        const r = String(Math.floor(Math.random()*99)+1);
        re [message.author.username] = {
            a: r
        }

        fs.writeFile("./nothing.json", JSON.stringify(re, null, 2), err=>{
            if(err) throw err;
        });
    }

}

module.exports = restartCommand;