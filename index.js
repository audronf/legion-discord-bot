const { Client, Intents } = require('discord.js');
const Sequelize = require('sequelize');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const prefix = '!';
var cmd;
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = sequelize.define('users', {
    name: {
        type: Sequelize.STRING
    },
    times: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    owner: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

client.once('ready', () => {
    Users.sync();
})

function handleShortcuts(msg) {
    switch(msg) {
        case '!ll':
            return '!lloriquin'
        default:
            return msg;
    }
}

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    cmd = handleShortcuts(message.content.split(" ")[0].toLowerCase())
    if (cmd.startsWith(prefix + "lloriquin")) {
        try {
            const mention = message.mentions.users.first()
            const user = mention.username ? mention.username : false
            if (user) {
                let u = await Users.findOne({
                    where: {
                        name: user
                    }
            });
                if (u) {
                    Users.update({ owner: false }, { where: {} })
                    u.times++
                    u.owner = true
                    u.save()                    
                    message.channel.send(user + " tiene el lloriquín. Ya se lo dieron " + u.times + " veces.")
                } else {
                    Users.update({ owner: false }, { where: {} })
                    await Users.create({
                        name: user,
                        owner: true
                    })
                    message.channel.send(user + " tiene el lloriquín. Es su primer lloriquín :3")
                }
            }
        } catch(error) {
            if (cmd === prefix + "lloriquin") {
                let owner = await Users.findOne({ where: { owner: true } })
                message.reply(owner.name + " tiene actualmente el lloriquín. Díganle que pare de llorar plis.")
            } else {
                message.reply("Poné bien el comando plis")
            }
        }
    }   
});

client.login(process.env.bot_token);
