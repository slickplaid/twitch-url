'use strict';

var qs = require('querystring');
var random_int = Math.round(Math.random() * 1e7);
var host = 'http://usher.twitch.tv';
function getUsherAPI(channel, token) {
  
  var path = '/api/channel/hls/' + channel + '.m3u8?';

  path = path + 'token='+token.token;

  var query = {
    player: 'twitchweb',
    //token: token.token, // odd handling of token parameter
    sig: token.sig,
    '$allow_audio_only': true,
    allow_source: true,
    type: 'any',
    p: random_int
  };

  path = '/api/channel/hls/'+channel+'.m3u8?player=twitchweb&token='+token.token+'&sig='+token.sig+'&$allow_audio_only=true&allow_source=true&type=any&p='+random_int;
  var usher_api_options = {
    uri: host+path,
    headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' }
  };

  var querystring = qs.stringify(query);
  usher_api_options.uri += querystring;

  return usher_api_options;
};

module.exports = getUsherAPI;