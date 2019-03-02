var expect = require('chai').expect;
var findAddress = require('../index.js');

describe('findAddress()', function() {
    it('should determine whether there is a string that starts with 0x in a tweet',function(){
        var tweet = 'hey 0x01325ab3125acbdssq32';
        var address = findAddress(tweet);
        expect(address.startsWith('0x')).to.be.true;
    });
});