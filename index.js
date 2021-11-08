const { Client, Intents } = require('discord.js');
const state = require("./state.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const prefix = '!';

client.on("message", function(message) {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix + "lloriquin ") && message.user != client) {
        try {
            const user = message.mentions.users.first().username ? message.mentions.users.first().username : false
            if (user) {
                let u = state.users.find(u => {
                    return u.name == user });
                if (u) {
                    message.reply(user + " tiene el lloriquín. Ya se lo dieron " + u.times + " veces.")
                }
            } else {
                message.reply("Tenés que decirme quien tiene el lloriquin, ahora lo tenes vos.")
            }
        } catch(error) {
            message.reply("Poné bien el comando plis");
        }
    }
});

client.login(process.env.bot_token);
