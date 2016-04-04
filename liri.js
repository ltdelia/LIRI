var keys = require('./keys.js');

var command = process.argv[2];


//All possible arguments
	//my-tweets
	//spotify-this-song
	//movie-this
	//do-what-it-says

if(command == "my-tweets"){

	var Twitter = require('twitter');

	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'ltdelia'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	  	for(var i=0; i<=20; i++){
	  		if(tweets[i]===undefined){
	  			console.log("");
	  		}else{
			  	console.log(tweets[i].user.name);
			    console.log(tweets[i].created_at);
			    console.log(tweets[i].text);
			}
		}
	  }
	});
}
