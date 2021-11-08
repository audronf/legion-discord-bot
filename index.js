const { Client, Intents } = require('discord.js')
const config = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on("message", function(message) {
    if (message.author.bot) return;
    if (message.content.includes("lloriquin") && message.user != client) {
        const user = message.content.split(' ')[1]

        if (user) {
            message.reply(user + " tiene el lloriquín")
        } else {
            message.reply("Tenés que decirme quien tiene el lloriquin, ahora lo tenes vos.")
        }
    }
});

client.login(config.bot_token);
