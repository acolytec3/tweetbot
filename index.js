const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config.twitter);
const axios = require('axios');

// Function to find Ethereum Address in tweet
function findAddress(message){
  var address = message.split(' ');
  for (let i = 0;i < address.length; i++){
    if (address[i].startsWith('0x')){
      return(address[i]);
    }
  return('')
  }
}

function getMoney(event){
  var address = findAddress(event.text)
  console.log(address);
  axios.post(config.faucet_address,{'address':findAddress(event.text),'agent':'twitter'})
  .then(function(response){
    T.post('statuses/update',{'status':'@'+event.user.screen_name + ' coins deposited'})
    console.log(response.data.status);
  })
  .catch(function(error){
    if (error.response.status == '500'){
      T.post('statuses/update',{'status':'@'+event.user.screen_name+' '+error.response.data.error}); 
      console.log(error.response.data)
    }
    else {
      T.post('statuses/update',{'status':'@'+event.user.screen_name+', something went wrong.  Please check your wallet address and try again later'}); 
       console.log(error.response.data);
    }
  });  
}

/*
//Twitter listener that listens for mentions of the TestOcean twitter account
var stream = T.stream('statuses/filter',{track:'@TestOcean'});
stream.on('data',function(event){
  console.log(event.text);
  getMoney(event);
});

stream.on('error',function(error){
  console.log(error);
});
*/
module.exports = findAddress;