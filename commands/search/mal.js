const commando = require('discord.js-commando');
const discord = require('discord.js');
const {Jikan} = require("node-myanimelist");

class malCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'myanimelist',
            group: 'search',
            aliases: ['mal'],
            memberName: 'myanimelist',
            description: 'Searchs anime through mal.',
            args: [
                {
                    key: 'anime',
                    prompt: 'What anime do you want to search?',
                    type: 'string'
                },
                {
                    key: 'amount',
                    prompt: 'How many results do you want to show?',
                    type: 'float'
                }
            ]
        });
    }

    async run(message, { anime , amount}) {
        var name = anime;
        var nums = amount;
        var max = 50;

        Jikan.search().anime({q: name}).then((j) => {
            let towrite = [];
            j.results.forEach(anime => {
                towrite.push(anime.title);
            });

            var stringifiedJSON = JSON.stringify(towrite, null, 2);

            if (nums > max) {
                var toWriteFile = `Sorry the max number of search result are ${max}
${towrite.length} search results for ${name}

${towrite.slice(0, towrite.length).join("\n")}`
            } else if (towrite.length < nums) {
                var toWriteFile = `Sorry we couldn't find ${nums} search result
We could only find ${towrite.length} search results for ${name}

${towrite.slice(0, towrite.length).join("\n")}`
            } else {
                var toWriteFile = `${nums} search results for ${name}

${towrite.slice(0, nums).join("\n")}`
            }

            const mEmbed = new discord.RichEmbed().setDescription(toWriteFile);

            message.say(mEmbed);
        });
    }

}

module.exports = malCommand;