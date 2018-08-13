const commando = require('discord.js-commando');
const discord = require('discord.js');

class multiplyMathCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'multiply-nums',
            group: 'math',
            memberName: 'multiply-nums',
            description: 'Multiplies numbers.',
            examples: ['multiply-nums 125 5'],
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
        var result = args.number1*args.number2;
        message.channel.sendMessage(args.number1 + " x " + args.number2 + " = " + result);
    }
}

module.exports = multiplyMathCommand;