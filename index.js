//define discord.js package
const Discord = require("discord.js"); //import discord libraries
const client = new Discord.Client();
const moment = require("moment");

const config = require("./config.json"); //Here bot token, welcome channel id, role id

//define welcome package
const welcome = require("./welcome"); //welcome costomize message
welcome(client);

// ... (Your existing code)

// Function to update member count
function updateMemberCount() {
    const activities = [
        { name: `${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Members🌠`, type: "WATCHING" },
        { name: `since ${moment(client.user.createdTimestamp).format("DD/MM/YYYY")}`, type: "PLAYING" },
        { name: "Paradise Music🎵", type: "LISTENING" },
        { name: "🌈paradise City", type: "WATCHING" },
        // Add more activities as needed
    ];

    let activityIndex = 0;

    setInterval(() => {
        activityIndex = (activityIndex + 1) % activities.length;
        const currentActivity = activities[activityIndex];
        client.user.setActivity(currentActivity.name, { type: currentActivity.type });
    }, 5 * 1000); // Update every 5 seconds
}

// Ready event
client.on("ready", () => {
    console.log("READY");
    client.user.setStatus("dnd");
    updateMemberCount(); // Call the function to update member count

    // Event for member joins
    client.on("guildMemberAdd", (member) => {
        updateMemberCount(); // Update member count when someone joins
    });

    // Event for member leaves
    client.on("guildMemberRemove", (member) => {
        updateMemberCount(); // Update member count when someone leaves
    });
});

// ... (Your existing code)

// Rest of your code remains unchanged

//start bot
client.login(config.BOT_TOKEN);


// coded by Thimeth.z |
