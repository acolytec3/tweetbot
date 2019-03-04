const Twitter = require('twitter');
const config = require('./config2.js');
const T = new Twitter(config.twitter);
var findAddress = require('./index.js').findAddress;
var getMoney = require('./index.js').getMoney;

function tweet(user_name, response){
  if (response.status == 200){
    T.post('statuses/update',{'status':'@' + user_name + ' coins deposited'})
  }  else if (error.response.status == '500'){
      T.post('statuses/update',{'status':'@'+user_name+' '+response.data.error}); 
  }
    else {
      T.post('statuses/update',{'status':'@'+user_name+', something went wrong.  Please check your wallet address and try again later'}); 
    }
}

//Twitter listener that listens for mentions of the TestOcean twitter account
var stream = T.stream('statuses/filter',{track:'@TestOcean'});
stream.on('data',function(event){
  console.log(event.text);
  getMoney(findAddress(event.text),tweet);
});

stream.on('error',function(error){
  console.log(error);
});
