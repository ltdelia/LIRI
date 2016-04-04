var keys = require('./keys.js');

var command = process.argv[2];

var query = process.argv[3];

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
	spotify();
	function spotify(){
		var spotify = require('spotify'); 	
		
		if(query == undefined){
			query = "what's my age again";
		}

		spotify.search({ type: 'track', query: query }, function(err, data) {
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
}else if(command == "movie-this"){
	var request = require('request');

	if(query == undefined){
		query = "Mr. Nobody";
	}
	
	request('http://www.omdbapi.com/?t='+query+'&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var json = JSON.parse(body);
    		// console.log(json) // The entire JSON object 
    	// display the following info
    		//Title
    		console.log("Title: " + json.Title);
    		//Year
    		console.log("Year: " + json.Year);
    		//IMDB Rating
    		console.log("IMDB Rating: " + json.imdbRating);
    		//Country
    		console.log("Country: "+ json.Country);
    		//Language
    		console.log("Language: " + json.Language);
    		//Plot
    		console.log("Plot: " + json.Plot);
    		//Actors
    		console.log("Actors: " + json.Actors);
    		//Rotten Tomatoes Rating
    		console.log("Rotten Tomatoes Rating: " + json.tomatoMeter + "%");
  		}
	})
}else if(command == "do-what-it-says"){
	var fs = require('fs');

	fs.readFile("random.txt", "utf8", function(err, data){
		var output = data.split(",");
		command = output[0];
		query = output[1];
		spotify();
	})
}
