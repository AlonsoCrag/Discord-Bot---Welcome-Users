let { Collection, Client, MessageEmbed, Message, Intents } = require('discord.js');
require('dotenv').config()
const fs = require('fs');
const { SlashCommandBuilder } =  require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [{
    name: 'ping',
    description: 'Replies with Pong!'
}]; 

let total_members = 54;

let colors = [
  '#E1E1E1',
  '#5142B0',
  '#B04265',
  '#42B052',
  '#4258B0',
]
  
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
  
(async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(
        Routes.applicationGuildCommands(process.env.SERVER, process.env.GUILD),
        { body: commands },
      );
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
})();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async member => {

    console.log("New user has joined");
    total_members += 1;
    
    let welcome_chann = member.guild.channels.cache.get('welcome_channel_id');
    
    let guild_name = member.guild.name;
    let username = member.displayName;
    let user_avatar = member.user.displayAvatarURL();

    let msg_embed = new MessageEmbed()
    .setColor(colors[Math.floor(Math.random() * colors.length)])
    .setTitle(username)
    .setAuthor({ name: `Welcome to ${guild_name}`, iconURL: member.guild.iconURL() })
    .setDescription('Ya era hora hora de unirte al server chamoy, toma una lata de frijoles <:BeanS:953753510632120340> <a:dance:953753894259945494> <a:pepesaber:953856157385121823> <a:CatDance:953856157259300944> \n Ve a <#953463260978495568> y raspale su mae a todos xD')
    .setThumbnail(user_avatar)
    .setImage(member.guild.bannerURL())
    .setFooter({ text: "```Member``` "  + "#" + total_members, iconURL: member.guild.iconURL() })

    welcome_chann.send(member.user.toString())
    console.log("Username to mention", member.user.toString())
    welcome_chann.send({ embeds: [ msg_embed ] })

});
  
client.on('interactionCreate', async interaction => {
    console.log("Some interaction");
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('@Bearz#0220');
    }
});


client.login(process.env.TOKEN)