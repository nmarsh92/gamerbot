let Twitter = require('twitter');
let ids = [];
module.exports = {
  register: async function() {
    try {
      var client = new Twitter(TokenService.twitter);
      var params = {
        cursor: -1,
        screen_name: TokenService.twitter.followScreenName,
        stringify_ids: true, //the ids are so large they may get mangled as ints
        count: 5000,
      }

      client.get('friends/ids', params, function(error, response, raw) {
        if (error) throw error;
        ids = response.ids;
        var stream = client.stream('statuses/filter', {
          follow: response.ids.join(',')
        });

        stream.on('data', function(event) {
          var message=''; 
          if (event.user && ids.includes(event.user.id_str)) {  
            if(event.in_reply_to_status_id_str) {
            // var statParams = {
            //     id: event.in_reply_to_status_id_str
            //   }
            //   client.get('statuses/show', statParams, function(error, tweet, raw){
            //     message += event.user.screen_name + ' : ' + event.text;
            //     message += '\n **replying to** \n' + tweet.user.screen_name + ' : ' + tweet.text;
            //       DiscordService.send(TokenService.discord.channels.socialFeed, message, DiscordService.format.blockQuote);
            //   });
            } else {
                 message += '**' + event.user.screen_name +'**\n' + event.text;
                 DiscordService.send(TokenService.discord.channels.socialFeed, message, DiscordService.format.blockQuote);
            }
            
            console.log(message);
          }
        });
        stream.on('error', function(error) {
          throw error;
        });
      });
    } catch (err) {
      console.log(err);
    }


  }
}
