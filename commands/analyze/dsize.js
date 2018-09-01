const commando = require('discord.js-commando');
const discord = require('discord.js');

class dSizeCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'dicksize',
            group: 'analyze',
            memberName: 'disksize',
            description: 'Analyze someone dicks size.',
            args: [
                {
                    key: 'user',
                    prompt:'Please provide a mention of the user.',
                    type: 'user'
                }
            ]
        });
    }

    async run(message, { user })
    {
        const normal = `8==D`;
        const r = Math.floor(Math.random() * 10)+1;
        const dsize = (normal).replace(/==/g, (`==`).repeat(r));
        message.say(`${user}'s dick size
${dsize}`);
    }
}

module.exports = dSizeCommand;