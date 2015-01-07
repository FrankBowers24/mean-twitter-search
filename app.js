var express = require('express');
var app = express();
var Twitter = require('node-twitter-api');


var twitter = new Twitter({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callback: null
      });


app.use(express.static('public'));

app.get('/search', function(request, response) {
    var paramsObj = {
    	q: request.param('q')};
    console.log("SEARCH: " + request.param('q')) ;

	twitter.search(paramsObj, process.env.ACCESS_TOKEN_KEY, process.env.ACCESS_TOKEN_SECRET, function(error, data) {
	    if (error) {
	        //something was wrong with either accessToken or accessTokenSecret
	        //start over with Step 1
	        console.log("Error: " + error);
	    } else {
	        //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
	        //data contains the user-data described in the official Twitter-API-docs
	        //you could e.g. display his screen_name
	        console.log("Screen Name: " + data["screen_name"]);
	        console.log("data: " + JSON.stringify(data, null, '\t'));
	        response.status(201).json(data);
	    }
    });

 
})

app.get('/twitter', function(request, response) {
	twitter.verifyCredentials(process.env.ACCESS_TOKEN_KEY, process.env.ACCESS_TOKEN_SECRET, function(error, data) {
	    if (error) {
	        //something was wrong with either accessToken or accessTokenSecret
	        //start over with Step 1
	        console.log("Error: " + error);
	    } else {
	        //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
	        //data contains the user-data described in the official Twitter-API-docs
	        //you could e.g. display his screen_name
	        console.log("Screen Name: " + data["screen_name"]);
	        console.log("data: " + JSON.stringify(data, null, '\t'));
	        response.status(201).json(data);
	    }
    });
})



app.listen(3000, function() {
	console.log("Environment: " + JSON.stringify(process.env, null, '\t'));
	console.log('Listening on port 3000');
});
