const commando = require('discord.js-commando');
const discord = require('discord.js');

class subtractMathCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'substract-nums',
            group: 'math',
            memberName: 'substract-nums',
            description: 'Subtracts numbers.',
            examples: ['substract-nums 74 9'],
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
        var result = args.number1-args.number2;
        message.channel.sendMessage(args.number1 + " - " + args.number2 + " = " + result);
    }
}

module.exports = subtractMathCommand;