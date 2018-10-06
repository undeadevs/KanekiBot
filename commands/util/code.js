const commando = require('discord.js-commando');
const discord = require('discord.js');
const fs = require('fs');

function TextAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}

class code extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'code',
            group: 'util',
            memberName: 'code',
            description: 'Shows code for the bot commands.',
            args: [
                {
                    key: 'group',
                    prompt: 'What commands group do you want to execute?',
                    type: 'string'
                },
                {
                    key: 'command',
                    prompt: 'What command do you want to execute?',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);
    }

    async run(message, {group, command})
    {
        const test = await require(`../${group}/${command}`);
        message.say(`
\`\`\`js
${TextAbstract(String(test), 2000)}
\`\`\`
        `);
    }

}

module.exports = code;