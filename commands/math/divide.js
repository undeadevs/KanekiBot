const commando = require('discord.js-commando');
const discord = require('discord.js');

class divideMathCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'divide-nums',
            group: 'math',
            memberName: 'divide-nums',
            description: 'Divides numbers.',
            examples: ['divide-nums 625 25'],
            args: [
                {
                    key: 'number1',
                    label:'number',
                    prompt:'First number',
                    type: 'float'
                },
                {
                    key: 'number2',
                    label:'number',
                    prompt:'Second number',
                    type: 'float'
                }
            ]
        });
    }

    async run(message, args)
    {
        var result = args.number1/args.number2;
        message.channel.sendMessage(args.number1 + " : " + args.number2 + " = " + result);
    }
}

module.exports = divideMathCommand;