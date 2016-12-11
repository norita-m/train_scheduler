 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAGk4I0VgLiSACV90Hf0-EmBdMCCV90J6Q",
    authDomain: "trains-ccc3f.firebaseapp.com",
    databaseURL: "https://trains-ccc3f.firebaseio.com",
    storageBucket: "trains-ccc3f.appspot.com",
    messagingSenderId: "1057439072596"
  };
  firebase.initializeApp(config);

//VARIABLES
  var database = firebase.database();
  var trainName;
  var destination;
  var trainTime;
  var frequency;

//FUNCTION
//when the user clicks submit, this function will run
$("submit").on("click", function(event) {

	//when user enters train name, this text is rendered in corresponding ID's div
	//val and trim prevent spaces from rendering
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	trainTime = $("#trainTime").val().trim();
	frequency = $("#frequency").val().trim();

	//QUESTION: this pushes the information to the database (why are the parenthesis empty??)
	database.ref().push({
	trainName: trainName,
	destination: destination, 
	trainTime: trainTime,
	frequency: frequency,

	});

	return false;

});