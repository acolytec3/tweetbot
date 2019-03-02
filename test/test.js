var expect = require('chai').expect;
var findAddress = require('../index.js');

describe('findAddress()', function() {
    it('should determine whether there is a string that starts with 0x in a tweet',function(){
        return findAddress('@TestOcean, Please give me some Ethereum 0x01325ab3125acbdssq32')
        .then(function(){expect(findAddress(tweet).startsWith('0x')).to.be.true;})
    });
});