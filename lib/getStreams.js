'use strict';

var request = require('request');
var getTokenAPI = require('./getTokenAPI');
var getUsherAPI = require('./getUsherAPI');
var parseUsher = require('./parseUsher');

module.exports = getStreams;

function getStreams(channel, callback) {
  var tokenApi = getTokenAPI(channel);
  getTwitchToken(tokenApi, function(err, token) {
    if(err || !token) {
      return callback('Unable to request API Token from Twitch');
    }

    var usherApi = getUsherAPI(channel, token);
    getUsherLinks(usherApi, function(err, usher) {
      if(err || !usher) {
        return callback('Unable to parse Twitch Usher links');
      }

      parseUsher(usher, function(err, streams) {
        if(err || !streams) {
          return callback(err);
        }

        callback(null, streams);
      });
    });

  });
};

function getTwitchToken(tokenApi, callback) {
  request.get(tokenApi, function(err, msg, token) {
    return callback(err, token);
  });
};

function getUsherLinks(usherApi, callback) {
  request.get(usherApi, function(err, msg, usher) {
    return callback(err, usher);
  });
};
