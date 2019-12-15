var assert = require('chai').assert;
var Outfit = require('../outfit');

describe('Outfit', function() {
  it('should be a function', function() {
    assert.isFunction(Outfit);
  });

  it('should start with no garments', function() {
    var outfit = new Outfit();
    assert.deepEqual(outfit.garments, [])
  });
}
