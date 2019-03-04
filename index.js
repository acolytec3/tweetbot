const Twitter = require('twitter');
const config = require('./config2.js');
const T = new Twitter(config.twitter);
const axios = require('axios');

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
exports.getMoney = function(address, tweet){
  try{
    const response = await axios.post(config.faucet_address,{'address':address,'agent':'twitter'});
    console.log(response.status);
    tweet(response.status)
  }
  catch(err){
    console.log(err.response.status);
    code = 200;
  }
}

 

 