let commandService = {
  key: '!',
  commands: {
    hey: {
      enabled: true,
      timeout: 0, //todo implement timeout for commands so they can't be spammed for things that may have API limits and such.
      adminOnly: false, //TODO, possible do by role?
      args: [],
      description: 'A friendly greeting!',
      example: '!hey',
      fn: function (message, args) {
        DiscordService.reply(message, 'Hello!');
      }
    },
    help: {
      enabled: true,
      timeout: 0,
      adminOnly: false,
      args: ['<command_name>'],
      description: 'Lists all commands or gives details on a specific command.',
      example:'!help <command_name>',
      fn: function (message, args) {
        let response = "```css\n";
        if (args && args[0]) {
          if (commandService.commands[args[0]]) {
            let command = commandService.commands[args[0]];
            response += args[0] + ' - ' + command.description;
            if(command.args && command.args.length > 0){
                response += '\nParameters'
                command.args.forEach(function (arg, index) {
                    response += '\n' + arg;
                });
            }
          } else {
            response += 'That is not a command, try just "!help" without any arguements for a list of commands.'
          }
        } else {

          for (let key in commandService.commands) {
            response += key + ' - ' + (commandService.commands[key].description || '');
            response += '\n';
          }

        }

        response += '```';
        DiscordService.reply(message, response);
      }
    }
  },
  execute: function (message) {
    var self = this;
    if (message && message.content && message.content.startsWith(self.key)) {
      var args = message.content.toLowerCase().split(' ');
      var command = args[0].substr(1);
      args.shift();

      if (self.commands[command] && self.commands[command].enabled) {
        self.commands[command].fn(message, args);
      }

    }
  }
}
module.exports = commandService;
