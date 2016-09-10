

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwfTrKTsEzp_pgqneMBN2oaTUpykPhwwY",
    authDomain: "briefopinions-a37aa.firebaseapp.com",
    databaseURL: "https://briefopinions-a37aa.firebaseio.com",
    storageBucket: "briefopinions-a37aa.appspot.com",
  };
  firebase.initializeApp(config);

    
// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var recent = "";



// Capture Button Click
$("#search").on("click", function() {

	// YOUR TASK!!!
	// Code in the logic for storing and retrieving the most recent user.
	// Dont forget to provide initial data to your Firebase database.

	recent = $('#case-input').val().trim();

	database.ref().set({
		recent: recent,
	
	});

	// Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

	// Log everything that's coming out of snapshot
	console.log(snapshot.val());
	console.log(snapshot.val().recent);
	

	// Change the HTML to reflect
	$("#recentSearches").html(snapshot.val().recent);



// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});