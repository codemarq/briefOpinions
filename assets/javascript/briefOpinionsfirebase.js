

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
$("#search").on("click", function(event) {

event.preventDefault();

console.log("database: ", database)


	recent = $('#case-input').val().trim();

console.log(recent)


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
	

	// Change the HTML to reflect
	$("#recentSearches").html(snapshot.val());



// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});