const Commando = require('discord.js-commando');
const discord = require('discord.js');
const fs = require('fs');
const config = require("./config.json");
const bot = new Commando.Client({owner: [config.ownerID, config.adminID], commandPrefix: 'c/'});
const TOKEN = config.token;

bot.on('ready',function(){
    console.log("SpecialCommand ready!");
});

//SPECIALCOMMAND CODE
const prefix = "$";

bot.on('message', function(message){
    msg = message.content.toLowerCase();
    mention = message.mentions.users.first();

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(message.author.bot) return;

    if(command === 'hsc'){
        if(!bot.isOwner(message.author)){message.delete(2000); message.channel.sendMessage("You do not have a permission to use special commands.").then(function(mmsg){mmsg.delete(2000);});}else{
        var hEmbed = new discord.RichEmbed()
            .setColor("0xBF4C4C")
            .addField(`__**SPECIAL COMMANDS**__`, `**prefix:** $`, true)
            .addField(`**DM**`, `**Desc:** \`Dms user using bot.\` \n**Usage:** \`$dm <user> <messages>\``, false)
            .addField(`**SPAM**`, `**Desc:** \`Spams user.\` \n**Usage:** \`$spam <user> <amount> <messages>\` \`spamlimit: 5\``, false)
        message.reply("Sent you a DM with information.");
        message.member.send(hEmbed);
        }
    }
    
    if(command === 'dm') {
        if(!bot.isOwner(message.author)){message.delete(2000); message.channel.sendMessage("You do not have a permission to use special commands.").then(function(mmsg){mmsg.delete(2000);});}else{
        if(mention == null){message.delete(2000); message.channel.sendMessage("Please put an invalid user.").then(function(mmsg){mmsg.delete(2000);});}else{
        am = args.slice(1).join(" ");
        message.delete(2000);
        mention.send(am);
        message.channel.sendMessage("Message sent").then(function(b_message){ b_message.delete(2000);});
        }}
    }

    if(command === 'spam') {
        if(!bot.isOwner(message.author)){message.delete(2000); message.channel.sendMessage("You do not have a permission to use special commands.").then(function(mmsg){mmsg.delete(2000);});}else{
        if(mention == null){message.delete(2000); message.channel.sendMessage("Please put an invalid user.").then(function(mmsg){mmsg.delete(2000);});}else{
        am = args.slice(2).join(" ");
        message.delete(2000);
        if(!args[1]) return message.channel.sendMessage("Please provide how many do you want to spam the user (spamlimit: 5).").then(function(mmsg){mmsg.delete(2000);});
        if(args[1]=="2"){
            mention.send(am);
            mention.send(am);
            message.channel.sendMessage("Spammed 2 messages").then(function(b_message){ b_message.delete(2000);});
        }else
        if(args[1]=="3"){
            mention.send(am);
            mention.send(am);
            mention.send(am);
            message.channel.sendMessage("Spammed 3 messages").then(function(b_message){ b_message.delete(2000);});
        }else
        if(args[1]=="4"){
            mention.send(am);
            mention.send(am);
            mention.send(am);
            mention.send(am);
            message.channel.sendMessage("Spammed 4 messages").then(function(b_message){ b_message.delete(2000);});
        }else
        if(args[1]=="5"){
            mention.send(am);
            mention.send(am);
            mention.send(am);
            mention.send(am);
            mention.send(am);
            message.channel.sendMessage("Spammed 5 messages").then(function(b_message){ b_message.delete(2000);});
        }else {message.channel.sendMessage("Please provide how many do you want to spam the user.").then(function(mmsg){mmsg.delete(2000);});}
    }}
    }

    /*try {
        // Code that we will 'try'
        if(message.member..has("473836688477650947")){

            if(msg.startsWith("dm ")){
                if(mention == null) return;
                um = message.content.slice(3);
                message.delete(1000);
                mention.send(um);
                message.channel.sendMessage("Message sent").then(function(b_message){ b_message.delete(1000);});
            }
            
            }
    }
    catch(error) {
        // Code that handles any potential errors
    }*/

});

//END

bot.login(TOKEN);