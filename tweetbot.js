const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config.twitter);
var findAddress = require('./index.js').findAddress;
var getMoney = require('./index.js').getMoney;

//Helper function that sends tweet
function tweet(status_code,message,event){
  if (status_code == 200){
	console.log(event.user.screen_name, message);
    T.post('statuses/update',{'status':'@' + event.user.screen_name + ' coins deposited'})
  }  else if (status_code == '500'){
      T.post('statuses/update',{'status':'@'+event.user.screen_name+' '+message}); 
  }
    else {
      T.post('statuses/update',{'status':'@'+event.user.screen_name+', something went wrong.  Please check your wallet address and try again later'}); 
    }
}



//Twitter listener that listens for mentions of the TestOcean twitter account
var stream = T.stream('statuses/filter',{track:'@TestOcean'});
stream.on('data',function(event){
  console.log(event.text);
  getMoney(findAddress(event.text))
  .then(response => tweet(response.status,response.message,event))
  .catch(error => tweet(error.status, error.message,event));
});

stream.on('error',function(error){
  console.log(error);
});

