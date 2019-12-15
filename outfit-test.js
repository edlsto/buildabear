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

  it('should be able to accept new garments', function() {
    var outfit = new Outfit();
    assert.deepEqual(outfit.garments, []);
    outfit.addGarment('Shirt');
    assert.deepEqual(outfit.garments, ['Shirt']);
  });

  it('should be able to remove garments', function() {
    var outfit = new Outfit();
    assert.deepEqual(outfit.garments, []);
    outfit.addGarment('Shirt');
    outfit.addGarment('Pants');
    assert.deepEqual(outfit.garments, ['Shirt', 'Pants']);
    outfit.addGarment('Pants');
    assert.deepEqual(outfit.garments, ['Shirt']);
  });
}
