$(document).ready(function() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyC8n_Hfi1nxa3sSLfr9TEGMQRq3QpB844I",
	    authDomain: "brief-opinions.firebaseapp.com",
	    databaseURL: "https://brief-opinions.firebaseio.com",
	    storageBucket: "",
	};
	firebase.initializeApp(config);

	var database = firebase.database();
	
	// query var will be where the search topic goes
	var query = '&case_name=roe+v+wade';

		// api endpoint url
		var queryURL = "https://www.courtlistener.com/api/rest/v3/search/?type=o&q=&type=o&order_by=score+desc&stat_Precedential=on&cited_gt=0&cited_lt=60000" + query;

        // makes the request for data from url
        $.ajax({
        		url: queryURL, 
        		method: 'GET'
       		}).done(function(response) {
       			console.log(response);
       			opinion = response.results[0].absolute_url;
       			console.log(opinion);
       			$('#opinion').html('<h2>' + response.results[0].snippet + '<h2>');
       		})
		
		curl -X POST --include 'https://extracttext.p.mashape.com/api/content_extract/' \
		  -H 'X-Mashape-Key: bsAWoVPCw0mshtGXn976UwaNxPsJp1Pk92djsnDGgknyotnlW9' \
		  -H 'Content-Type: application/x-www-form-urlencoded' \
		  -H 'Accept: application/json' \
		  -d 'dataurl=http://www.vanityfair.com/business/2013/06/kara-swisher-instagram'
		// var queryUrl2 = "https://www.courtlistener.com/api/rest/v3/opinions/" + opinion;
		// $.ajax({
		// 	url: queryUrl2,
		// 	method: 'GET'
		// }).done(function(response2) {
		// 	$('#opinion').html('Opinion: ' + response2);
		// });

});