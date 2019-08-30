const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
  client: client,
  register: function () {
    client.on('message', msg => {
      CommandService.execute(msg);
    });
    
    client.login(TokenService.discord);
  }
}
