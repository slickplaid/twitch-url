var http = require('http');
var m3u8 = require('m3u8');
var stream = require("stream");

var channel = process.argv[2];
var token, urls, parser;
var random_int = Math.round((Math.random(0, 10000000) * (10000000 - 0)) + 0);

var token_api_options = {
    host: 'api.twitch.tv',
    path: '/api/channels/'+channel+'/access_token'
}

var request_api = http.get(token_api_options, function(response){
    
    var body;
    
    response.on('data', function(chunk){
        body = chunk;
    });

    response.on('end', function() {

        token = JSON.parse(body);

        var usher_api_options = {
		     host: 'usher.twitch.tv',
		     path: '/api/channel/hls/'+channel+'.m3u8?player=twitchweb&token='+token.token+'&sig='+token.sig+'&$allow_audio_only=true&allow_source=true&type=any&p='+random_int
		}

        var request_usher = http.get(usher_api_options, function(response_usher){

        	var body_usher = '';
        	
        	response_usher.on('data', function(chunk){
	        	body_usher += chunk;
		    });

		    response_usher.on('end', function() {

		    	parser = m3u8.createStream();

		    	var a = new stream.PassThrough();
				a.write(body_usher);
				a.end();

				a.pipe(parser);

				parser.on('m3u', function(m3u) {
					
					m3u.items.StreamItem.forEach(function(item, key) {

						var mediaItem = m3u.items.MediaItem[key];
						var height = item.attributes.attributes.resolution[1];
				 		var width = item.attributes.attributes.resolution[0];
				 		var name = mediaItem.attributes.attributes.name;

				 		console.log(name+': '+width+' x '+height);
				 		console.log(item.properties.uri);
					});
					
				});	    	

		    });

        }).on('error', function(e){
		    console.log('Error: ', e.message);
		});

    });

}).on('error', function(e){
    console.log('Error: ', e.message);
});