const config = require('./config.js');
const axios = require('axios');
//const am = require('axios-mock-adapter');

// Function to find Ethereum Address in tweet
exports.findAddress = function(message){
  var address = message.split(' ');
  for (let i = 0;i < address.length; i++){
    if (address[i].startsWith('0x')){
      return(address[i]);
    }
  }
  return '';
}

// Function to request coins from faucet
exports.getMoney = async function(address){
  return await axios.post(config.faucet_address,{'address':address,'agent':'twitter'})
  .then(function(response){
//    console.log(response);
    return({'status':response.data.status, 'message':'x tokens deposited'})
  })
  .catch(function(error){
//    console.log(error);
    if (error.status == 400){
    	console.log(error.status);
    	return ({'status':error.status, 'message':'Something.  Please check your wallet address and try again later.'});
    } else return ({'status':error.status, 'message':error.response.data.error});
  })
}

