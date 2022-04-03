let { Collection, Client, MessageEmbed, Message, Intents, ReactionManager } = require('discord.js');
require('dotenv').config()
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Welcome_Embed_Msg } = require('./events/welcome');
const CustomRoles = require('./events/customRoles').CustomRoles;

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  },
  {
    name: 'roles',
    description: 'Use role reactions!'
  },
  {
    name: 'info',
    description: 'Get info about reactions in the message!'
  }
];

// let total_members = 54;

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS ] });

client.on('ready', async () => {
  console.log(`Bot is Logged in as ${client.user.tag}!`);
  CustomRoles(client);
});

client.on('guildMemberAdd', async member => {

  Welcome_Embed_Msg(member);

});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('@Bearz#0220');
  }

  if (interaction.commandName === 'roles') {
    let roles_channel = interaction.guild.channels.cache.get('953741491946266685');
  }

  if (interaction.commandName === 'info') {
    let roles_channel = interaction.guild.channels.cache.get('953741491946266685');
  }

});


client.login(process.env.TOKEN)