var keys = require('./keys.js');

var fs = require ('fs');

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
	  			// declared variables for the tweet content
	  			var username = tweets[i].user.name;
	  			var created = tweets[i].created_at;
	  			var tweet = tweets[i].text;

	  			// logging the tweet to the terminal
			  	console.log(username);
			    console.log(created);
			    console.log(tweet);

				// append the tweet to log.txt
			    fs.appendFile("log.txt", username, function(err, data){})
			    fs.appendFile("log.txt", "-----", function(err,data){})
			    fs.appendFile("log.txt", created, function(err,data){})
			    fs.appendFile("log.txt", "-----", function(err,data){})
			    fs.appendFile("log.txt", tweet, function(err,data){})	
			    fs.appendFile("log.txt", "-----", function(err,data){})

			}
		}
		fs.appendFile("log.txt", "*** end of tweets ***", function(err, data){})
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
		    	// declared variables for spotify content
		    	var artist = data.tracks.items[0].artists[0].name;
		    	var song = data.tracks.items[0].name;
		    	var preview = data.tracks.items[0].preview_url;
		    	var album = data.tracks.items[0].album.name;
		    	
		    	// display the following info to the terminal
		    	
		    	//artist(s)
		    	console.log("Artist: " + artist);
		    	//song name
		    	console.log("Song: "+ song);
		    	//preview link of the song from spotify
		    	console.log("Preview Link: " + preview);
		    	//album the song is a part of 
		    	console.log("Album: " + album);

		    	// append the info to log.txt

			    fs.appendFile("log.txt", artist, function(err, data){})
			    fs.appendFile("log.txt", "-----", function(err,data){})
			    fs.appendFile("log.txt", song, function(err,data){})
			    fs.appendFile("log.txt", "-----", function(err,data){})
			    fs.appendFile("log.txt", preview, function(err,data){})	
			    fs.appendFile("log.txt", "-----", function(err,data){})
			    fs.appendFile("log.txt", album, function(err,data){})	
			    fs.appendFile("log.txt", "-----", function(err,data){})

			 	fs.appendFile("log.txt", "*** end of spotify ***", function(err, data){})   		    	
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

  			var title = json.Title;
  			var year = json.Year;
  			var imdbRating = json.imdbRating;
  			var country = json.Country;
  			var language = json.Language;
  			var plot = json.Plot;
  			var actors = json.Actors;
  			var tomatoes = json.tomatoMeter;

    	// display the following info
    		//Title
    		console.log("Title: " + title);
    		//Year
    		console.log("Year: " + year);
    		//IMDB Rating
    		console.log("IMDB Rating: " + imdbRating);
    		//Country
    		console.log("Country: "+ country);
    		//Language
    		console.log("Language: " + language);
    		//Plot
    		console.log("Plot: " + plot);
    		//Actors
    		console.log("Actors: " + actors);
    		//Rotten Tomatoes Rating
    		console.log("Rotten Tomatoes Rating: " + tomatoes + "%");

    	// append to log.txt
		    fs.appendFile("log.txt", title, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})
		    fs.appendFile("log.txt", year, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})
		    fs.appendFile("log.txt", imdbRating, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})
		    fs.appendFile("log.txt", country, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})
		    fs.appendFile("log.txt", language, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})
		    fs.appendFile("log.txt", plot, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})
		    fs.appendFile("log.txt", actors, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})
		    fs.appendFile("log.txt", tomatoes, function(err, data){})
		    fs.appendFile("log.txt", "-----", function(err,data){})

			fs.appendFile("log.txt", "*** end of omdb ***", function(err, data){})		    		    		    		    		    		    		    
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
