const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
  client: client,
  register: function () {
    client.on('message', msg => {
      CommandService.execute(msg);
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
