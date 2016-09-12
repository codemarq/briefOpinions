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

	//  opinion from court listener opinions api
	var opinionEndpoint = 'https://www.courtlistener.com/api/rest/v3/opinions/?case_name=roe+v+wade';		
	var opinion = '';
	var opinionRoot = "https://www.courtlistener.com";
    var opinions = [];
    var query = '';

    // second ajax call-intellexer summarizer
    var	apikey2 = '55accaef-cf1e-4ff6-91cf-8bd4a4dc93ac';
       
	// Search Button Click
	function search (event) {
	
		// prevent reload of page if user hits enter
		event.preventDefault();
		
		recent = $('#case-input').val().trim();

		// set firebase value
		database.ref().set({
			recent: recent,
		});

		// query var captures input for first ajax call to court listener api
		query = $('#case-input').val().trim();
		// court listener api endpoint url
		var queryUrl1 = "https://www.courtlistener.com/api/rest/v3/search/?type=o&q=&type=o&order_by=score+desc&stat_Precedential=on&cited_gt=0&cited_lt=6000&case_name=" + query;
		
		// empty search field
		$('#case-input').empty();
       	// makes the request for data from courtListener
   		$.ajax({
    		url: queryUrl1, 
    		method: 'GET'
    		// when done
    	}).done(function(response) {
       		if (response.results.length == 0) {
       			$('#result').html('<h3>No results found, check spelling!</h3>');
       		} else {
       			// draw a table for search results
       			var table = $('<table>');
       			table.attr('id', 'table');
       			var tableHead = $('<thead>');
       			
       			var tableRow = $('<tr>');
       			tableRow.attr('id', 'tableRow');
       			tableRow.addClass('row')

       			var tableBody = $('<tbody>');
   				tableBody.attr('id', 'tableBody')
       				
       			// write table of search results to html
       			$('#result').empty();
       			$('#result').html('<h3>Results</h3>');
       			$('#result').append(table);
   				$('#table').append(tableHead);
   				$('#table').append(tableRow);
       			$('#tableRow').append('<th class="col-md-3"><h4>Case Name</h4></th>');
       			$('#tableRow').append('<th class="col-md-3"><h4>Court</h4></th>');
       			$('#tableRow').append('<th class="col-md-6"><h4>Abstract</h4></th>');
       			$('#table').append(tableBody);

       			// populate table with data
       			for (var i = 0; i < response.results.length; i++) {
       				var resultRow = $('<tr>');
       				resultRow.attr('value', i);
       				resultRow.attr('id', 'resultRow' + i);
       				resultRow.addClass('row');
       				resultRow.addClass('resultRow');

       				$('#tableBody').append(resultRow);
       				$('#resultRow' + i).append('<td value=' + i + '>' + response.results[i].caseName + '</td>');
       				$('#resultRow' + i).append('<td value=' + i + '>' + response.results[i].court + '</td>');
       				$('#resultRow' + i).append('<td value=' + i + '>' + response.results[i].snippet + '</td><br>');

       				// store array of absolute url's
       				opinion = 'http://api.intellexer.com/summarize?apikey=' + apikey2 + '&conceptsRestriction=7&returnedTopicsCount=2&summaryRestriction=10&textStreamLength=1000&url=' + opinionRoot + response.results[i].absolute_url;
       				opinions.push(opinion);
       			}
       		}     		
    	});
	};

	// second ajax call. when selecting which case from results the case is summarized
	function summarize () {
		var num = parseInt($(this).attr('value'));
   		var queryUrl2 = opinions[num];
   		$('#result').empty();
   		$('#result').html('<h2>Briefing...</h2>');
   		
       	$.ajax({
       		url: queryUrl2,
   			method: 'GET'
	   	}).done(function(response2) {
	   		$('#result').empty();
       		$('#result').html("<h3>You've Been Briefed!</h3>");
       		for (var i = 0; i < response2.items.length; i++) {
       			$('#result').append('<p>' + response2.items[i].text + '</p>');	
       		}
       		
       		var backButton = $('<button>Back</button>');
       		backButton.attr('id', 'backButton');
       		backButton.addClass('btn btn-success');
       		backButton.attr('type', 'button');
       		backButton.attr('name', 'Back');

       		$('#result').append(backButton);
       	});
	};

	// back button on summary page, reloads previous results
	function restoreTable () {

	}


	// 	event listeners
	$(document).on('click', '#search', search);
 	$(document).on('click', 'td', summarize);
 	$(document).on('click', '#backButton', restoreTable);
});