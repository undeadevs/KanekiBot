const commando = require('discord.js-commando');

class kerangAjaib extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'apakah',
            group: 'fun',
            memberName: 'apakah',
            description: 'Kerang Ajaib dari Spongebob.',
            args: [
                {
                    key: 'pertanyaan',
                    prompt:'apakah apaan woy!',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { pertanyaan })
    {
        const qMark = pertanyaan.slice(-1);
        if(qMark=="?"){
        if(pertanyaan == "saya ganteng?")
        {
            message.channel.sendMessage("N G A R E P");
        }
        else
        {
            var chance = Math.floor(Math.random() * 2);
            if(chance == 0)
            {
                message.channel.sendMessage(`ya`);
            }
            else
            {
            message.channel.sendMessage("tidak");
            }
        }
        } else { return message.say(`Pake tanda tanya di akhir kalimat oy.`); }
    }
}

module.exports = kerangAjaib;