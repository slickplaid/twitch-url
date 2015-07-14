var chai = require('chai');
assert = chai.assert;
expect = chai.expect;
chai.should();

var getLinks = require('../twitch');

describe('Twitch', function() {

  it('Require a channel name', function(done) {
    getLinks(undefined, function(err, links) {
      expect(err).to.exist;
      expect(links).to.not.exist;
      done();
    });
  });

});