const config = require('./config2.js');
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
exports.getMoney = async function(address, callback){
  return await axios.post("http://192.168.1.11:3001/faucet",{'address':address,'agent':'twitter'})
  .then(function(response){
    console.log(response.data.status);
    callback(response.data.status, 'x tokens deposited')
  })
  .catch(function(error){
    console.log(error.status);
    callback(error.status, 'an error occurred');
  })
}

 

 