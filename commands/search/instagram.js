const commando = require('discord.js-commando');
const discord = require('discord.js');
const Axios = require('axios');

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
            const userInfoSource = await Axios.get(`https://www.instagram.com/${user}/`);
          
            // userInfoSource.data contains the HTML from Axios
            const jsonObject = userInfoSource.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1);
          
            const userInfo = JSON.parse(jsonObject);
          
            const uInfo = userInfo.entry_data.ProfilePage[0].graphql.user;
            const username = userInfo.entry_data.ProfilePage[0].graphql.user.username;
            const pfp = userInfo.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd;
            const fullname = userInfo.entry_data.ProfilePage[0].graphql.user.full_name;
            const followers = userInfo.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count;
            const following = userInfo.entry_data.ProfilePage[0].graphql.user.edge_follow.count;
            const post = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count;

            const postimage = [];
            const postcaption = [];
            const npost = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0,1);
            for (let media of npost) {
                const node = media.node
                
                // Process only if is an image
                if ((node.__typename && node.__typename !== 'GraphImage')) {
                    continue
                }
    
                // Push the thumbnail src in the array
                await postimage.push(node.display_url);

                const capt = node.edge_media_to_caption.edges[0];

                for (let media of [capt]) {
                const node = media.node

                await postcaption.push(node.text);
                }
            }

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
            console.log(postimage);
            console.log(postcaption);

        }
        catch(error){
            message.say(`Err: ${error}`);
        }
        }

        instagramInfo();
    }

}

module.exports = instagramCommand;