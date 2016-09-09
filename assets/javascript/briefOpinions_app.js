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
	//  opinion from opinions api
	var opinionEndpoint = 'https://www.courtlistener.com/api/rest/v3/opinions/?case_name=roe+v+wade'
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
	
	setTimeout(function () {
		dataUrl = opinionRoot + opinion;
		console.log('dataUrl: ' + dataUrl);
		

		/* textualize curl to ajax not working

		 $.ajax({
    			url: queryURL2,
    			method: 'GET',
    			headers: {'X-Mashape-Key': 'bsAWoVPCw0mshtGXn976UwaNxPsJp1Pk92djsnDGgknyotnlW9',
    				'Content-Type': 'application/x-www-form-urlencoded',
    				'Accept': 'application/json' 
    			},
    			dataurl: dataUrl, 
    		}).done(function (response2) {
    			console.log(response2);
    			$('#result').html('<p>' + response + '</p>');
    	*/

    	textapi.summarize({
  			url: 'http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate',
  			sentences_number: 3
		}, function(error, response) {
  			if (error === null) {
    			response.sentences.forEach(function(s) {
      			console.log(s);
    			});
  			}
		});

    	
    // timeout for now.  will add this to the submit on-click function
	}, 5000);
	
	// original curl below

		// curl -X POST --include 'https://extracttext.p.mashape.com/api/content_extract/' \
		//   -H 'X-Mashape-Key: bsAWoVPCw0mshtGXn976UwaNxPsJp1Pk92djsnDGgknyotnlW9' \
		//   -H 'Content-Type: application/x-www-form-urlencoded' \
		//   -H 'Accept: application/json' \
		//   -d 'dataurl=http://www.vanityfair.com/business/2013/06/kara-swisher-instagram'
		// 
		// var queryUrl2 = "https://www.courtlistener.com/api/rest/v3/opinions/" + opinion;
		// 
		// $.ajax({
		// 	url: queryUrl2,
		// 	method: 'GET'
		// }).done(function(response2) {
		// 	$('#opinion').html('Opinion: ' + response2);
		// });

});