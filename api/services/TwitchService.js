let request = require('request');
module.exports = {
    createClip: async function(twitchId){
        var options = {
            url: 'https://api.twitch.tv/helix/clips?broadcaster_id=' + twitchId,
            headers: {
                'Client-ID': TokenService.twitch 
            }
        }
        request.post(options, function(error, response, body){
            console.log(error);
            console.log(response);
            console.log(body);
            return "Finished";
        });
    }

}