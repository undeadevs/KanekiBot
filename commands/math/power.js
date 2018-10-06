const commando = require('discord.js-commando');
const discord = require('discord.js');

class powerMathCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'power-nums',
            group: 'math',
            memberName: 'power-nums',
            description: 'Powers numbers.',
            examples: ['power-nums 3 2'],
            args: [
                {
                    key: 'number1',
                    label:'number',
                    prompt:'The number you want to power.',
                    type: 'float'
                },
                {
                    key: 'number2',
                    label:'number',
                    prompt:'The power of the number.',
                    type: 'float'
                }
            ]
        });
    }

    async run(message, { number1, number2 })
    {
        var result = Math.pow(number1, number2);
        message.channel.sendMessage(number1 + "^" + number2 + " = " + result);
    }
}

module.exports = powerMathCommand;