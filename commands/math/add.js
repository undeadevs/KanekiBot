const commando = require('discord.js-commando');
const discord = require('discord.js');

class addMathCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'add-nums',
            group: 'math',
            memberName: 'add-nums',
            description: 'Adds numbers together.',
            examples: ['add-nums 7 34'],
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
        var result = args.number1+args.number2;
        message.channel.sendMessage(args.number1 + " + " + args.number2 + " = " + result);
    }
}

module.exports = addMathCommand;