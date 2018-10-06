const commando = require('discord.js-commando');
const discord = require('discord.js');

class rootMathCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'root-nums',
            group: 'math',
            memberName: 'root-nums',
            description: 'Roots numbers.',
            examples: ['root-nums 16 4'],
            args: [
                {
                    key: 'number1',
                    label:'number',
                    prompt:'The number you want to root.',
                    type: 'float'
                },
                {
                    key: 'number2',
                    label:'number',
                    prompt:'The root of the number.',
                    type: 'float'
                }
            ]
        });
    }

    async run(message, { number1, number2 })
    {
        var result = Math.pow(number1, 1/number2);
        message.channel.sendMessage(`Root ${number2} of ${number1} is ${result}`);
    }
}

module.exports = rootMathCommand;