const commando = require('discord.js-commando');
const discord = require('discord.js');
const profanities = require('profanities');

const dotenv = require('dotenv').config();

const GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(process.env.giphyapikey);

class giphyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'giphy',
            group: 'search',
            memberName: 'giphy',
            description: 'Searchs a random gif through giphy.',
            args: [
                {
                    key: 'text',
                    prompt: 'What do you want to search?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { text }) {
        var txt = text.toLowerCase();

        if(profanities.includes(text)) return message.say(`PG Bruh.`);
        giphy.search('gifs', { 'q': text , 'rating': 'pg'}).then((res) => {
            console.log(res);
            var totalResponses = res.data.length;
            var responsesIndex = Math.floor(Math.random() * 10) + 1 % totalResponses;
            var responseFinal = res.data[responsesIndex];

            message.say(`Giphy search results for ${text}`, { files: [responseFinal.images.fixed_height.url] });
        }).catch((e)=>{
            message.say(`PG Bruh.`);
        });
    }

}

module.exports = giphyCommand;