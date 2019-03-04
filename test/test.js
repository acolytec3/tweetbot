var expect = require('chai').expect;
var findAddress = require('../index.js').findAddress;
var getMoney = require('../index.js').getMoney;
var axmock = require('axios-mock-adapter');
var axios = require('axios');

var mock = new axmock(axios);

mock.onPost().reply(200,{'status':200});

//Unit test for positive scenario where a correct-looking address is provided to function
describe('findAddress()', function() {
    it('should determine whether there is a string that starts with 0x in a tweet',function(){
        var tweet = '@TestOcean, give me some ETH 0x01325ab3125acbdssq32';
        var address = findAddress(tweet);
        expect(address.startsWith('0x')).to.be.true;
    });
});

//Unit test to validate to ensure proper response is created when a correct looking response is provided by stubbed back-end
describe('getMoney()', function(){
    it('should post a request for coins to the Faucet Server and return a 200 status to calling code when a valid-looking address is provided and a 200 status code is received from server',async() => {
        var address = '@TestOcean, gimme some ETH 0x185jfae';
	const response = await getMoney(findAddress(address));
	expect(response.status).to.equal(200);
    });
});
