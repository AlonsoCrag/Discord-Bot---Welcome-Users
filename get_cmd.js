const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');

let token = process.env.TOKEN

const Bot = new Discord.Client();

Bot.commands = new Discord.Collection();

const find_command = async (message, commandName) => {
    let files = fs.readdirSync('./commands').filter(cur => cur.endsWith('.js'));
    let cmd_obj = await new Promise((suc, rej) => {
        for (let elm in files) {
            let handler = require(`./commands/${files[elm]}`);
            Bot.commands.set(handler.name, handler);
            if (commandName === handler.name) {
                return suc(Bot.commands.get(commandName));   
            }
        }
        return rej();
    })

    return cmd_obj;
}

Bot.login(token);

Bot.once('ready', function() {
    console.log('Bot is online');
});



Bot.on('message', message => {
    if (message.author.bot) return;
    
    let [cmd, args] = message.content.split(' ');
    find_command(message, cmd)
    .then(invoker => {
        invoker.execute(message, args);
    })
    .catch(() => console.log('Error, command dosent exists.'));
});
