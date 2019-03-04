var expect = require('chai').expect;
var findAddress = require('../index.js').findAddress;
var getMoney = require('../index.js').getMoney;
describe('findAddress()', function() {
    it('should determine whether there is a string that starts with 0x in a tweet',function(){
        var tweet = '@TestOcean, give me some ETH 0x01325ab3125acbdssq32';
        var address = findAddress(tweet);
        expect(address.startsWith('0x')).to.be.true;
    });
});

describe('getMoney()', function(){
    it('should post a request for coins to the Faucet Server and return a 200 status when a valid address is provided',function(){
        var address = '0x185jfae';
        expect(getMoney(address).status).to.equal('200');
    });
});