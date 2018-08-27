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

    async run(message, { number1, number2 })
    {
        var result = number1*number2;
        message.channel.sendMessage(number1 + " x " + number2 + " = " + result);
    }
}

module.exports = multiplyMathCommand;