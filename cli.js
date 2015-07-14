#!/usr/bin/env node

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));
var pkg = require('./package.json');
var getLinks = require('./twitch.js');
var log = function(data) {
  process.stdout.write.call(process.stdout, data);
};

if(argv.h || argv.help) {
  log('Usage: twitchurl <channel> [channel...]\n');
  process.exit()
}

if(argv.v || argv.version) {
  log('Version: '+pkg.version+'\n');
  process.exit();
}

var channels = argv._;

if(channels.length < 1) {
  log('You must include at least one channel to parse. Usage: twitchurl <channel> [channel...]\n');
  process.exit();
}

channels.forEach(function(channel) {
  (function(chan) {
    getLinks(channel, function(err, links) {
      if(err || !links) {
        log('There was an error parsing links for `'+channel+'`:\n');
        log(err);
        log('\n\n');
      } else {
        log('\n\nLinks found for channel `'+channel+'`:\n\n');
        links.forEach(function(link) {
          log(link.description+' '+link.uri+'\n');
        });
        log('\n\n');
      }
    });
  })(channel);
});