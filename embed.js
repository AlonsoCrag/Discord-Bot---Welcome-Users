let { Collection, Client, MessageEmbed, Message, Intents } = require('discord.js');
require('dotenv').config()
const fs = require('fs');
const { SlashCommandBuilder } =  require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });
bot.commands = new Collection();

// Set commands
const commandFiles = fs.readdirSync('./commands').filter(curr => curr.endsWith('.js'));
for (let elm in commandFiles) {
    let cmd = require(`./commands/${commandFiles[elm]}`);
    bot.commands.set(cmd.name, cmd);
}

bot.once('ready', data => {
    console.log('Bot is ready.');
});

bot.on('guildMemberAdd', async member => {

    console.log("New user has joined");
    
    let welcome_chann = member.guild.channels.cache.get('953463260978495568');
    
    let guild_name = member.guild.name;
    let username = member.displayName;
    let user_avatar = member.user.displayAvatarURL();

    let msg_embed = new MessageEmbed()
    .setColor('#96372C')
	.setTitle(username)
	.setAuthor(`Welcome to ${guild_name}`, member.guild.iconURL())
	.setDescription('Welcome to the server, do whatever you want here <3')
	.setThumbnail(user_avatar)

    welcome_chann.send({ embeds: [ msg_embed ] })

});

bot.on('messageCreate', async message => {

    console.log("Message was sent")
    
    if (message.author.bot || !bot.commands.has(message.content)) {
        console.log('Its a bot message')
        return;
    }

    if (message.content === '!hi') {
        bot.commands.get(message.content).execute(message)
    }

});

bot.login(process.env.TOKEN)