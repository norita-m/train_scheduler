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
$("#submit").on("click", function(event) {

	//when user enters train name, this text is rendered in corresponding ID's div
	//val and trim prevent spaces from rendering
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	trainTime = $("#trainTime").val().trim();
	frequency = $("#frequency").val().trim();

	//console logs
	console.log(trainName);
	console.log(destination);
	console.log(trainTime);
	console.log(frequency);

	//this pushes the information to the database 
	database.ref().push({
		trainName: trainName,
		destination: destination, 
		trainTime: trainTime,
		frequency: frequency,

	});

	return false;

});

//this calls firebase
database.ref().on("child_added", function(snap) {
	
	// //this will calculate the difference of the next arrival
	var firstTrainInput = snap.val().trainTime;
	console.log("First Train = " + firstTrainInput);
	// //moment - convert time 
	var timeConverted = moment(trainTime, "HHmm");
	console.log("time converted = " + timeConverted);

	//calculate arrival of next train (firstTrain + Next Frequency)
	//NOT RIGHT var nextTrain = moment().diff(timeConverted, "hh:mm");
	//console.log("Next Train = " + nextTrain);

	//NEED FORMULA TO CALCULATE HOW MANY MINUTES AWAY

	var timeFromStart = moment().add(timeConverted, "minutes");
	console.log("Total time from Train Start = " + timeFromStart);

	var minTillNext = (timeFromStart % snap.val().frequency);
	console.log("Next train arriving in = " + minTillNext.toString() + "minutes");

	var newRow = $("<tr>");
	newRow.append($("<td>" + snap.val().trainName + "</td>"));
	newRow.append($("<td>" + snap.val().destination + "</td>"));
	newRow.append($("<td>" + snap.val().frequency + "</td>"));
	newRow.append($("<td>" + snap.val().nextTrain + "</td>"));
	//newRow.append($("<td>" + snap.val().minutesAway + "</td>"));
	 $("tbody").append(newRow);

});














