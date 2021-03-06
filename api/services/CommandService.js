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
      fn: async function (args) {
        return 'Hello!';
      }
    },
    clip: {
      enabled: false, //TODO.
      timeout: 0,
      adminOnly: false,
      args: ['<twitch_name>'],
      description: 'Creates a clip for provided twitch name.',
      example: '!clip itsdarkcloud',
      fn: async function (args) {
        let response = 'That is not a command, try "!help" for a list of commands.';
        if (args && args[0]) {
          response = await TwitchService.createClip(args[0]);
        }
        //  DiscordService.reply(message, response);
        return response;
      }
    },
    minecraft: {
      enabled: true,
      timeout: 0,
      adminOnly: false,
      args: [],
      description: 'A fun sandbox game.',
      fn: async function (args) {
        return "Josh's favorite game ever."
      }
    },
    add:{
      enabled: true,
      timeout: 0,
      adminOnly: false,
      args:['<numbers>'],
      description: "Add numbers together.",
      fn: async function(args){
        var value = 0;
        if(args && args.length > 0){
          args.forEach(function(arg){
            if(!isNaN(arg)){
              value += parseFloat(arg);
            }
          });
        }

        return value;
      }
    },
    subtract:{
      enabled: true,
      timeout: 0,
      adminOnly: false,
      args:['<numbers>'],
      description: "Subtract numbers together.",
      fn: async function(args){
        var value = 0;
        if(args && args.length > 0){
          value = args[0];
          args.forEach(function(arg){
            if(!isNaN(arg)){
              value -= parseFloat(arg);
            }
          });
        }

        return value;
      }
    },
    multiply: {
      enabled: true,
      timeout: 0,
      adminOnly: false,
      args:['<numbers>'],
      description: "Multiply numbers together.",
      fn: async function(args){
        var value = 1;
        if(args && args.length > 0){
          args.forEach(function(arg){
            if(!isNaN(arg)){
              value *= parseFloat(arg);
            }
          });
        }

        return value;
      }
    },
    divide: {
      enabled: true,
      timeout: 0,
      adminOnly: false,
      args:['<dividend>', '<divisor>'],
      description: "Divide a number.",
      fn: async function(args){
        if(args && args.length === 2 && !isNaN(args[0]) && !isNaN(args[1])){
          return parseFloat(args[0]) / parseFloat(args[1]);
        } else {
         return commandService.commands.help.fn(['divide']);
        }
      }
    },
    help: {
      enabled: true,
      timeout: 0,
      adminOnly: false,
      args: ['<command_name>'],
      description: 'Lists all commands or gives details on a specific command.',
      example: '!help <command_name>',
      fn: async function (args) {
        let response = "```css\n";
        if (args && args[0] && commandService.commands[args[0]] && commandService.commands[args[0]].enabled) {
          let command = commandService.commands[args[0]];
          response += args[0] + ' - ' + command.description;
          if (command.args && command.args.length > 0) {
            response += '\nParameters'
            command.args.forEach(function (arg, index) {
              response += '\n' + arg;
            });
          }
        } else {
          for (let key in commandService.commands) {
            response += key + ' - ' + (commandService.commands[key].description || '');
            response += '\n';
          }

        }
        response+='```';

        return response;
      }
    }
  },
  execute: async function (message) {
    let self = this;
    if (message && message.content && message.content.startsWith(self.key)) {
      let args = message.content.toLowerCase().split(' ');
      let command = args[0].substr(1);
      let response = 'That is not a command, try "!help" for a list of commands.';
      args.shift();

      if (self.commands[command] && self.commands[command].enabled) {
        response = await self.commands[command].fn(args);

      }
      DiscordService.reply(message, response);
    }
  }
}
module.exports = commandService;
