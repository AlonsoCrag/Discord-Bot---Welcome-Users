let { Collection, Client, MessageEmbed, Message, Intents } = require('discord.js');
const axios = require('axios');

let colors = [
    '#E1E1E1',
    '#5142B0',
    '#B04265',
    '#42B052',
    '#4258B0',
]


const Request = async(username) => {
    let resp = await axios.post('http://64.227.25.226:6060/discord', {
        username,
        token: process.env.TOKEN_REQ
    });
    console.log(resp.status);
    console.log("Request finished");
}

module.exports = {

    Welcome_Embed_Msg: (member) => {
        let welcome_chann = member.guild.channels.cache.get('984841767662813194');

        let guild_name = member.guild.name;
        let username = member.displayName;
        let user_avatar = member.user.displayAvatarURL();

        // ---- CREATE AN EMBED MESSAGE ----
        // let msg_embed = new MessageEmbed()
        //     .setColor(colors[Math.floor(Math.random() * colors.length)])
        //     .setTitle(username)
        //     .setAuthor({ name: `Welcome to ${guild_name}`, iconURL: member.guild.iconURL() })
        //     .setDescription('It was about time <:BeanS:953753510632120340> <a:dance:953753894259945494> <a:pepesaber:953856157385121823> <a:CatDance:953856157259300944> \n Ve a <#953463260978495568> y raspale su mae a todos xD')
        //     .setThumbnail(user_avatar)
        //     .setImage(member.guild.bannerURL())
        // .setFooter({ text: "```Member``` " + "#" + total_members, iconURL: member.guild.iconURL() })
        // ---- CREATE AN EMBED MESSAGE ----

        Request(member.displayName)
            .then(_ => {
                console.log("Success");
                welcome_chann.send(member.user.toString())
                console.log("Username to mention", member.user.toString())
                welcome_chann.send({ files: [`./assets/${username}.gif`] })
            })
            .catch(err => console.log("Error, sorry"));

        // welcome_chann.send(member.user.toString())
    }


}