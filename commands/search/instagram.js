const commando = require('discord.js-commando');
const discord = require('discord.js');
const Axios = require('axios');
const Instagram = require('axios-instagram-scraper');
const formatNumbers = require('../../formatNumbers')

class instagramCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'instagram',
            group: 'search',
            aliases: ['ig'],
            memberName: 'instagram',
            description: 'Shows someone instagram info.',
            args: [
                {
                    key: 'user',
                    prompt:'Please provide a valid instagram username.',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { user })
    {
        async function instagramInfo () {

        try{
            var ig = await Instagram.getProfile(user);

            const username = ig.username
            const pfp = ig.profile_picture;
            const fullname = ig.full_name;
            const followers = ig.followers
            const following = ig.following;
            const post = ig.post_count;
            const postimage = ig.recent_post.image;
            const postcaption = ig.recent_post.caption;

            if(fullname){
                var igEmbed = new discord.RichEmbed()
                    .setTitle(`Info for: ${username}`)
                    .setImage(pfp)
                    .addField(`Full Name:`, fullname,false)
                    .addField(`Followers:`, followers,false)
                    .addField(`Following:`, following,false)
                    .addField(`Posts:`, post,false)
                    .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL);
            }else{
                var igEmbed = new discord.RichEmbed()
                    .setTitle(`Info for: ${username}`)
                    .setImage(pfp)
                    .addField(`Followers:`, followers,false)
                    .addField(`Following:`, following,false)
                    .addField(`Posts:`, post,false)
                    .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL);
            }

            if(String(postcaption)==``){
                var postEmbed = new discord.RichEmbed()
                    .setTitle(`${username}'s Recent Post`)
                    .setDescription(`${username} hasn't been posting recently.`)
                    .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL);
            }else{
                var postEmbed = new discord.RichEmbed()
                    .setTitle(`${username}'s Recent Post`)
                    .setImage(String(postimage))
                    .setDescription(String(postcaption))
                    .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL);
            }
          
            message.say(igEmbed);
            await message.say(postEmbed);

            console.log(ig);

        }
        catch(error){
            message.say(`Err: ${error}`);
        }
        }

        instagramInfo();
    }

}

module.exports = instagramCommand;