'use strict';

var getStreams = require('./lib/getStreams');

module.exports = getLinks;

function getLinks(channel, callback) {
  if(typeof callback !== 'function') {
    callback = function(){};
  }

  if(typeof channel === 'undefined' || !channel) {
    return callback('You must supply a channel to get links from.');
  }

  var links = [];
  getStreams(channel, function(err, streams) {
    if(err) {
      return callback(err);
    }

    streams.forEach(function(stream) {

      var description = stream.name +': '+ stream.width +'x'+ stream.height;
      var link = {
        stream: stream,
        description: description,
        uri: stream.uri
      };

      links.push(link);
    });

    return callback(err, links);
  });
};