const commando = require('discord.js-commando');
const discord = require('discord.js');
const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

class UwU extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'owoify',
            group: 'random',
            memberName: 'owoify',
            description: 'OwO.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to OwO?',
					type: 'string',
					validate: text => {
						if (this.owo(text).length < 2000) return true;
						return 'Invalid text, your text is too long.';
                    }
                }]
        });
    }

    run(msg, { text }) {
        return msg.say(this.owo(text));
    }
    
    owo(text) {
        return text
            .replace(/(?:r|l)/g, 'w')
            .replace(/(?:R|L)/g, 'W')
            .replace(/n([aeiou])/g, 'ny$1')
            .replace(/N([aeiou])/g, 'Ny$1')
            .replace(/N([AEIOU])/g, 'NY$1')
            .replace(/ove/g, 'uv')
            .replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
            .trim();
    }

}

module.exports = UwU;