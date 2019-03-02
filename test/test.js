var expect = require('chai').expect;
var findAddress = require('../index.js');

describe('findAddress()', function() {
    it('should determine whether there is a string that starts with 0x in a tweet',function(){
        tweet = '@TestOcean, Please give me some Ethereum 0x01325ab3125acbdssq32'
        address = findAddress(tweet);
        console.log(address);
        expect(address.startsWith('0x')).to.be.true;
    });
});