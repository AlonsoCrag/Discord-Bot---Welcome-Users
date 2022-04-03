const Roles = require('../roles/roles');

const CustomRoles = (client) => {
    
  let server = client.guilds.cache.get(process.env.GUILD)
  let channel = server.channels.cache.get(process.env.CHANNEL_ROLES);

  channel.messages.fetch('960181987975512096')
    .then((message) => {
      console.log("Message exists...");
      // message.react('😎')
      const filter = (reaction, user) => {
        let member = server.members.cache.get(user.id);
        let rol = server.roles.cache.find(role => role.name == reaction._emoji.name).id;
        let emoji = Roles[reaction._emoji.name]
        member.roles.add(rol);
        console.log(`New Rol ${reaction._emoji.name} added to ${user.username}`);
        member.send(`${user.username} you just choose the Rol ${reaction._emoji.name} ${emoji}`);
      }
      message.awaitReactions({ filter, max: 1 });
    })
    .catch(async (err) => {
      console.log("Message doesnt exists...");

      const message = await channel.send(
        {
          content: 'React to a role',
          fetchReply: true
        }
      );
      message.react('<a:Baiter:953753894259945494>');
      message.react('<:Empanada:960169822434512906>');
      message.react('<:Master:960169517928034395>');
      message.react('<a:Free:953856157385121823>');

    });

}

module.exports = {
    CustomRoles 
}