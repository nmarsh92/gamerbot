  let Twitter = require('twitter');
  let ids = [];
  module.exports = {
    register: async function() {
      try {
        var client = new Twitter(TokenService.twitter);

        client.get('friends/ids.json?cursor=-1&screen_name=itsdarkcloudtv&count=5000&stringify_ids=true', function(error, response, raw) {
          if (error) throw error;
           ids = response.ids;
          var stream = client.stream('statuses/filter', {
            follow: response.ids.join(',')
          });
          stream.on('data', function(event) {
            if(ids.includes(event.id_str)){
              DiscordService.client.channels.get("621551424911835148").send((event.user.screen_name + ' : ' + event.text));
                console.log(event.user.screen_name + ' : ' + event.text);
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