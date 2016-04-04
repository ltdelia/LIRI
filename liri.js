var keys = require('./keys.js');

var command = process.argv[2];

var request = process.argv[3];

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
}else if(command == "spotify-this-song"){

	var spotify = require('spotify'); 	
	
	if(request == undefined){
		request = "what's my age again";
	}

	spotify.search({ type: 'track', query: request }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	    	// console.log(data.tracks.items[0]);
	    // display the following info 
	    	//artist(s)
	    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
	    	//song name
	    	console.log("Song: "+ data.tracks.items[0].name);
	    	//preview link of the song from spotify
	    	console.log("Preview Link: " + data.tracks.items[0].preview_url);
	    	//album the song is a part of 
	    	console.log("Album: " + data.tracks.items[0].album.name);
	    }
});
}
