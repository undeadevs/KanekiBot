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
            const followers = userInfo.entry_data.ProfilePage[0].graphql.user.edge_follow.count;
            const post = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count;

            const res = [];
            const res0 = [];
            const npost = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0,1);
            for (let media of npost) {
                const node = media.node
                
                // Process only if is an image
                if ((node.__typename && node.__typename !== 'GraphImage')) {
                    continue
                }
    
                // Push the thumbnail src in the array
                await res.push(node.display_url);

                const capt = node.edge_media_to_caption.edges[0];

                for (let media of [capt]) {
                const node = media.node

                await res0.push(node.text);
                }
            }

            const igEmbed = new discord.RichEmbed()
                    .setTitle(`Info for: ${username}`)
                    .setImage(pfp)
                    .addField(`Full Name:`, fullname,false)
                    .addField(`Followers:`, followers,false)
                    .addField(`Posts:`, post,false)
                    .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL);

            const postEmbed = new discord.RichEmbed()
                    .setTitle(`${username}'s Recent Post`)
                    .setImage(String(res))
                    .setDescription(String(res0));
          
            message.say(igEmbed);
            await message.say(postEmbed);
            console.log(res);
            console.log(res0);

        }
        catch(error){
            message.say(`${user} is either a private instagram user or not an instagram user.`);
        }
        }

        instagramInfo();
    }

}

module.exports = instagramCommand;