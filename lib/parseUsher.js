'use strict';

var m3u8 = require('m3u8');
var Stream = require('stream');

function parseUsher(usher, callback) {

  var parser = m3u8.createStream();
  var m3stream = new Stream.PassThrough();

  m3stream.pipe(parser);
  m3stream.write(usher);
  m3stream.end();

  var streams = [];

  parser.on('m3u', function (m3u) {
    m3u.items.StreamItem.forEach(function (item, key) {

      var mediaItem = m3u.items.MediaItem[key];
      var stream = {
        mediaItem: mediaItem,
        height: item.attributes.attributes.resolution[1],
        width: item.attributes.attributes.resolution[0],
        name: mediaItem.attributes.attributes.name,
        uri: item.properties.uri
      };

      streams.push(stream);

    });

    callback(null, streams);
  });

  parser.on('error', function(err) {
    callback(err);
  });
};

module.exports = parseUsher;