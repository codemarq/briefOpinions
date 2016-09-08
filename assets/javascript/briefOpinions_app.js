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
	var query = 'roe+v+wade';
	var opinion = '';

	// api endpoint url
	var queryURL = "https://www.courtlistener.com/api/rest/v3/search/?type=o&q=&type=o&order_by=score+desc&stat_Precedential=on&cited_gt=0&cited_lt=6000&case_name=" + query;
	var opinionRoot = "https:/www.courtlistener.com"
    // makes the request for data from courtListener
    $.ajax({
    		url: queryURL, 
    		method: 'GET'
    		// when done
    	}).done(function(response) {
       		console.log(response);
       		// store absolute variable for opinion url globally
       		opinion = response.results[0].absolute_url;

       		console.log(opinion);
       		$('#result').html('<p>' + response.results[0].snippet + '</p>');
    });
	console.log(opinion);

	var queryURL2 = 'https://extracttext.p.mashape.com/api/content_extract/';



    // $.ajax({
    // 	url: queryURL2,
    // 	method: 'GET',
    // 	headers: {'X-Mashape-Key': 'bsAWoVPCw0mshtGXn976UwaNxPsJp1Pk92djsnDGgknyotnlW9',
    // 				'Content-Type': 'application/x-www-form-urlencoded',
    // 				'Accept': 'application/json' 
    // 			},
    // 	dataurl: opinion, 
    // }).done(function (response2) {
    // 	console.log(response2);
    // 	$('#opinion').html('<p>' + response + '</p>');
    // });



		// curl -X POST --include 'https://extracttext.p.mashape.com/api/content_extract/' \
		//   -H 'X-Mashape-Key: bsAWoVPCw0mshtGXn976UwaNxPsJp1Pk92djsnDGgknyotnlW9' \
		//   -H 'Content-Type: application/x-www-form-urlencoded' \
		//   -H 'Accept: application/json' \
		//   -d 'dataurl=http://www.vanityfair.com/business/2013/06/kara-swisher-instagram'
		// var queryUrl2 = "https://www.courtlistener.com/api/rest/v3/opinions/" + opinion;
		// $.ajax({
		// 	url: queryUrl2,
		// 	method: 'GET'
		// }).done(function(response2) {
		// 	$('#opinion').html('Opinion: ' + response2);
		// });

});