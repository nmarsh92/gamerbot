const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
  client: client,
  register: function () {
    client.on('message', msg => {
      CommandService.execute(msg);
    });

    client.on('guildMemberAdd', member => {
      // Send the message to a designated channel on a server:
      const channel = member.guild.channels.find(ch => ch.name === 'member-log');
      // Do nothing if the channel wasn't found on this server
      if (!channel) return;
      // Send the message, mentioning the member
      channel.send(`Welcome to the server, ${member}`);
    });

    client.login(TokenService.discord);
  },
  reply: function (message, reply) {
    if (reply) {
      message.reply(reply)
        .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        .catch(console.error);
    }
  }
}
