const Twitter = require('twitter');
const config = require('./config2.js');
const T = new Twitter(config.twitter);
var findAddress = require('../index.js').findAddress;
var getMoney = require('../index.js').getMoney;

//Twitter listener that listens for mentions of the TestOcean twitter account
var stream = T.stream('statuses/filter',{track:'@TestOcean'});
stream.on('data',function(event){
  console.log(event.text);
  response = getMoney(findAddress(event.text));
  if (response.status == '200'){
    T.post('statuses/update',{'status':'@'+event.user.screen_name + ' coins deposited'})
  }else if (response.status == '500'){
    T.post('statuses/update',{'status':'@'+event.user.screen_name+' '+response.response.data.error}); 
  }else {
    T.post('statuses/update',{'status':'@'+event.user.screen_name+', something went wrong.  Please check your wallet address and try again later'});  
  }
});

stream.on('error',function(error){
  console.log(error);
});
