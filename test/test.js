var expect = require('chai').expect;
var findAddress = require('../index.js');

describe('findAddress()', function() {
    it('should identify a phrase that begins with 0x within a tweet and return it',function(){
        var tweet = '@TestOcean, give me some ETH 0x01325ab3125acbdssq32';
        var address = findAddress(tweet);
        expect(address.startsWith('0x')).to.be.true;
    });
    it('should return a blank if no Ethereum address is found within a tweet',function(){
        var tweet = '@TestOcean, given me ETH pretty please';
        var address = findAddress(tweet);
        expect(address).to.equal('');
    })
});

