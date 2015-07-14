'use strict';

var host = 'http://api.twitch.tv';
function getTokenAPI(channel) {
  
  var path = '/api/channels/' + channel + '/access_token';

  var token_api_options = {
    uri: host+path,
    json: true,
    headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' }
  };

  return token_api_options;
};

module.exports = getTokenAPI;