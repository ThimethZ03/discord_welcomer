const config = require("./config.json"); //her welcome channel id and roles id

//define font build package
const Canvas = require("canvas");

//define the discord.js package
const Discord = require("discord.js");

//font building package
const { registerFont, createCanvas } = require('canvas');
registerFont("./source/font/FORMULA-A.ttf", { family: 'FORMULA' });

//welcome design start
module.exports = function (client) {
    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "1.0.0"
    };

    //Bot login message
    console.log(` :: ✅ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}") | Bot is running perfectly`);

    //send message with image every time someone joins the server
    client.on("guildMemberAdd", async member => {
        //If not in a guild return
        if(!member.guild) return;

        //create a new canvas
        const canvas = Canvas.createCanvas(1772, 633);
        const ctx = canvas.getContext('2d');

        //set the background image
        const background = await Canvas.loadImage(`./source/image/welcomeFace.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#8525FA';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        //set username in middle
        var textString3 = `${member.user.username}`;
        if (textString3.length >= 14) {
            ctx.font = 'bold 60px "FORMULA"';
            ctx.fillStyle = '#f9f7f6';
            ctx.fillText(textString3, 650,150);
        } else {
            ctx.font = 'bold 100px "FORMULA"';
            ctx.fillStyle = '#f9f7f6';
            ctx.fillText(textString3, 650,150);
        }

        //set member count in last
        var textString4 = `#${member.guild.memberCount}`;
        ctx.font = 'bold 60px "FORMULA"';
        ctx.fillStyle = '#00ced1';
        ctx.fillText(textString4, 650, canvas.height / 2 + 300);

        // create a circular mask
        ctx.beginPath();
        ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
        ctx.closePath();
        ctx.clip();

        //define the user avatar
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

        //get it in a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        // Format the account creation date
        const creationDate = member.user.createdAt;
        const formattedDate = creationDate.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });

        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
            .setTitle(`Welcome to ${member.guild.name}`)
            .setColor("#c318cf")
            .setThumbnail("https://cdn.discordapp.com/attachments/959881099771772988/1274241663295819786/thumbnail.gif?ex=66c18986&is=66c03806&hm=72e1d662fec4a65a28cedb162ff6d207f879fb3b47370a22f1865a0af1db289f&")
            .setTimestamp()
            .setFooter("Create By Paradise City Roleplay", member.guild.iconURL({ dynamic: true }))
            .setDescription(`**Hello!** ${member.user} **we are happy to have you! Go To **<#${960049754253967400n}> **Channel And VERIFY To Get Access Of The Channels. You are member number** ${member.guild.memberCount}**.**\n\n**You account created at:** ${formattedDate}`)
            .setImage("attachment://welcome-image.png")
            .attachFiles(attachment);

        //define the welcome channel
        const channel = member.guild.channels.cache.find(ch => ch.id === config.WELCOME_CHANNEL);
        //send the welcome embed there
        channel.send(welcomeembed);

        //member roles add on welcome every single role
        let roles = config.ROLES;
        for(let i = 0; i < roles.length; i++) {
            member.roles.add(roles[i]);
        }
    });
}

// coded by Thimeth.z |
