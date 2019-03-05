var expect = require('chai').expect;
var findAddress = require('../index.js').findAddress;
var getMoney = require('../index.js').getMoney;
var axmock = require('axios-mock-adapter');
var axios = require('axios');

var mock = new axmock(axios);

//###################  Unit Tests  #################################
mock.onPost().reply(200,{'status':200});

//Unit test for positive scenario where a correct-looking address is provided to function
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

//Unit test to validate to ensure proper response is created when a correct looking response is provided by stubbed back-end
//Note: Server response is mocked up in this one
describe('getMoney()', function(){
    it('should post a request for coins to the Faucet Server and return a 200 status to calling code when a valid-looking address is provided and a 200 status code is received from server',async() => {
        var address = '@TestOcean, gimme some ETH 0x185jfae';
	const response = await getMoney(findAddress(address));
	expect(response.status).to.equal(200);
    });
});

mock.restore();

// #############  Integration Tests  #####################
//Test to validate to ensure proper response from the faucet server is created when a valid address is provided 
//Note: The Faucet Server must be configured in config.js for this test to pass
describe('getMoney()', function(){
    it('should post a request for coins to the Faucet Server and return a 200 status when a valid address is provided',async() => {
    var address = '@TestOcean, gimme some ETH 0xa9fe9c78359e841a473fcd54d595c0fd521f4bdb';
	const response = await getMoney(findAddress(address));
	expect(response.status).to.equal(200);
    });
});


