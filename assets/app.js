  $(document).ready(function(){

     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqpmBRTBVI331OwhFPTt3aW_DJfcGIYAk",
    authDomain: "gotrain-839f6.firebaseapp.com",
    databaseURL: "https://gotrain-839f6.firebaseio.com",
    projectId: "gotrain-839f6",
    storageBucket: "gotrain-839f6.appspot.com",
    messagingSenderId: "467166374745"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var trainName = "";
  var destination = "";
  var firstTime = "";
  var freQ = "";

  $("#add-train-btn").on("click", function () {
    // Don't refresh the page!
    event.preventDefault();
    
    console.log("you clicked");
    // Takes the user input
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#train-time").val();
    freQ= $("#frequency").val().trim();
    
    // Check for the user input
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(freQ);

    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    // Push to Firebase
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      freQ: freQ,
    });

  });
  database.ref().on("child_added", function(childSnapshot) {
    // debugger;
    //Assign Firebase variables to snapshot
    var firebasetrainName = childSnapshot.val().trainName;
    var firebaseDestination = childSnapshot.val().destination;
    var firebasefirstTime= childSnapshot.val().firstTime;
    var firebasefreQ = childSnapshot.val().freQ;

    console.log(childSnapshot.val());
       // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firebasefirstTime, "HH:mm").subtract(1, "years");
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   // Time apart (remainder)
   var tRemainder = diffTime % firebasefreQ;
   // Minute Until Train
   var tMinutesTillTrain = firebasefreQ - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    console.log(nextTrain);
    console.log(tMinutesTillTrain);
    console.log(nextTrain);
    console.log(moment().format("hh:mm"));
    console.log(nextTrain);
    console.log(moment().format("X"));

    //Append information to the table
  $("#train-table > tbody").append("<tr><td>" + firebasetrainName +
  "</td><td>" +firebaseDestination +
  "</td><td>" + firebasefreQ +
  "</td><td>" + nextTrain +
  "</td><td>"+ tMinutesTillTrain + "</td></tr>" );


//   database.ref().orderByChild("trainName").limitToLast(1).on("child_added", function(snapshot) {

//   var sv = snapshot.val();

//   console.log(sv.trainName, sv.destination, sv.nextTrain, sv.freQ, sv.tMinutesTillTrain);


//   $("#train-name").text(sv.trainName);
// $("#destination").text(sv.destination);
// $("#first-time").text(sv.nextTrain);
// $("#frequency").text(sv.freQ);
// $("#frequency").text(sv.tMinutesTillTrain);

});
});

  

  // //  database.ref().on("child_added", function(childSnapshot) {
  //   $("tbody").append("<tr><th>" + childSnapshot.val().trainName +
  // "<td>" + childSnapshot.val().destination +
  // "<td>" + childSnapshot.val().freQ +
  // "<td>" + childSnapshot.val().nextTrain +
  // "<td>" + childSnapshot.val().tMinutesTillTrain);
  
  // // });


// // Initial Values


// // var firstTime = $("first-time").val();
// // var freq = "";

// // Assume the following situations.

//     // (TEST 1)
//     // First Train of the Day is 3:00 AM
//     // Assume Train comes every 3 minutes.
//     // Assume the current time is 3:16 AM....
//     // What time would the next train be...? (Use your brain first)
//     // It would be 3:18 -- 2 minutes away

//     // (TEST 2)
//     // First Train of the Day is 3:00 AM
//     // Assume Train comes every 7 minutes.
//     // Assume the current time is 3:16 AM....
//     // What time would the next train be...? (Use your brain first)
//     // It would be 3:21 -- 5 minutes away


//     // ==========================================================

//     // Solved Mathematically
//     // Test case 1:
//     // 16 - 00 = 16
//     // 16 % 3 = 1 (Modulus is the remainder)
//     // 3 - 1 = 2 minutes away
//     // 2 + 3:16 = 3:18

//     // Solved Mathematically
//     // Test case 2:
//     // 16 - 00 = 16
//     // 16 % 7 = 2 (Modulus is the remainder)
//     // 7 - 2 = 5 minutes away
//     // 5 + 3:16 = 3:21

//     // Assumptions
//     var tFrequency = 3;

//     // Time is 3:30 AM
//     // var firstTime = "03:30";
//     var firstTime = "";

//     // First Time (pushed back 1 year to make sure it comes before current time)
//     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     // Current Time
//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//     // Difference between the times
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
//     var tRemainder = diffTime % tFrequency;
//     console.log(tRemainder);

//     // Minute Until Train
//     var tMinutesTillTrain = tFrequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));






// // database.ref().orderByChild("trainName").limitToLast(1).on("child_added", function(snapshot) {

// //   var sv = snapshot.val();

// //   console.log(sv.trainName, sv.role, sv.nextTrain, sv.tFrequency, sv.tMinutesTillTrain);


// //   $("#train-name").text(sv.trainName);
// // $("#destination").text(sv.destination);
// // $("#first-time").text(sv.nextTrain);
// // $("#frequency").text(sv.tFrequency);
// // $("#frequency").text(sv.tMinutesTillTrain);

// // });
