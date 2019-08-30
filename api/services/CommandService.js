module.exports =  {
    key: '!',
    commands: {
        hey:{
            enabled: true,
            timeout: 0,
            fn: function(message, args) {
                message.reply('Hello!')
                .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
                .catch(console.error);
            } 
        }
    },
    execute: function(message) {
        var self = this;
        if(message && message.content && message.content.startsWith(self.key)){
            var args = message.content.split(' ');
            var command = args[0].substr(1);
            args.shift();

            if(self.commands[command] && self.commands[command].enabled) {
                self.commands[command].fn(message, args);
            }
          
        }
    }
}