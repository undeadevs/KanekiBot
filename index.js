const Commando = require('discord.js-commando');
const fs = require('fs');
const config = require("./config.json");
const bot = new Commando.Client({owner: [config.ownerID, config.adminID], commandPrefix: 'c/'});
const TOKEN = config.token;

//clientID 478376842248716291
//inviteLink https://discordapp.com/oauth2/authorize?client_id=478376842248716291&scope=bot&permissions=2146958847

bot.registry.registerDefaultTypes();
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('math', 'Math');
bot.registry.registerGroup('guild', 'Guild');
bot.registry.registerDefaultGroups();
bot.registry.registerDefaultCommands();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready',function(){
    console.log("Login Success");

    bot.user.setActivity('Unravel', {type: 'LISTENING'});
});

global.currentTeamMembers = [];
global.servers = {};

bot.msgs = require("./msgs.json");

try {
bot.on('guildMemberAdd', function(member){
    //DYas = member.guilds.find("name", "DYas");
    //tst = member.guilds.find("name", "tst");

    //this is for my server
    if(bot.isOwner(member)){
        let or = member.guild.roles.find("name", "admin");
        let gc = member.guild.channels.find("name", "🚪lobby");
        if(!or){
            return gc.send(['Welcome to the Server ' + member, rules]);
        }
        member.addRole(or);
        gc.send('Welcome to the Server my owner!!!');
    }else if(!bot.isOwner(member)){
        let mr = member.guild.roles.find("name", "trash");
        let gc = member.guild.channels.find("name", "🚪lobby");
        if(!mr){
            return gc.send(['Welcome to the Server ' + member, rules]);
        }
        member.addRole(mr);
        let rules = "RULES : \n-do not insult anyone.";
        gc.send(['Welcome to the Server ' + member, rules]);

    }
    //end

    //member.send('Welcome to the Server ' + member);

});
}
catch(error){}

bot.on('messageUpdate', function(newMessage, oldMessage){
});

const sc = require("./sc");

bot.on('message', function(message){
    mention = message.mentions.users.first();
    msg = message.content.toLowerCase();
    
    if(message.author.bot) return;
    /*if(msg == "tickle " + mention){
        message.channel.sendMessage('tickled ' + mention, {files: [__dirname + "/pics/tickled0.gif"]});

    }*/
    
    if(msg == "hello" | msg == "hi" | msg == "hey"){

        message.channel.sendMessage('Hello ' + message.author + ',how are you?');
    }

    if(msg == "dasar wibu" | msg == "wibu lo"){

        message.channel.sendMessage('bodo amat.');

    }

});

bot.login(TOKEN);