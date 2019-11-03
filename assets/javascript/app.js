$(document).ready(function() {
    //initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyA8n1i9xuoZfBJFABXSunSb2rDO32K5B2Q",
        authDomain: "train-activity-f31f3.firebaseapp.com",
        databaseURL: "https://train-activity-f31f3.firebaseio.com",
        projectId: "train-activity-f31f3",
        storageBucket: "train-activity-f31f3.appspot.com",
        messagingSenderId: "143771624964",
        appId: "1:143771624964:web:6431841fa0e19712743751",
        measurementId: "G-NQNQSZVQMB"
      };

      firebase.initializeApp(firebaseConfig);

    //initialize global variables
    var trainName = "";
    var trainDestination = "";
    var firstTrain = "";
    var trainFrequency = "";
    var nextTrain = "";
    var minutesAway = "";
    var currentTime = "";
    var database = firebase.database();

    //display time in html
    function displayClock() {
        currentTime = moment();
        currentTime = moment(currentTime).format("hh:mm:ss A")
        $("#displayTime").text("Current Time: " + currentTime);
        timer = setTimeout(displayClock, 500)
    }
    displayClock();

    //submit button click event
    $("#add-train").on("click", function(event) {
        event.preventDefault();

        //pull and store values from input form
        trainName = $("#train-name").val().trim();
        trainDestination = $("#destination").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        trainFrequency = $("#frequency-input").val().trim();

        //push data to firebase database
        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            firstTrain: firstTrain,
            trainFrequency: trainFrequency
        });

        //form validation
        if (trainName.length === 0 || trainDestination.length === 0 || firstTrain.length ===  0 || trainFrequency.length === 0) {
            alert("Please fill all required fields!");
            if (trainName.length === 0) {
                alert("Train name input is not valid.");
                $("#train-name").css("background-color", "pink");
            } else {
                $("#train-name").css("background-color", "white");
            }

            if (trainDestination.length === 0) {
                alert("Destination input is not valid.");
                $("#destination").css("background-color", "pink");
            } else {
                $("#destination").css("background-color", "white");
            }

            if (firstTrain.length === 0) {
                alert("First train input is not valid.");
                $("#first-train-input").css("background-color", "pink");
            } else {
                $("#first-train-input").css("background-color", "white");
            }

            if (trainFrequency.length === 0) {
                alert("Train frequency input is not valid.");
                $("#frequency-input").css("background-color", "pink");
            } else {
                $("#frequency-input").css("background-color", "white");
            }
        }

        //check firstTrain input for valid HH:MM input
        function validateFirstTrain () {
            var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/.test(firstTrain);
            console.log(isValid)
            if (isValid) {
                $("#first-train-input").css("background-color", "white");
            }
            else {
                $("#first-train-input").css("background-color", "pink");
                alert("First Train input is not valid. Please enter a time in 24-hour format(HH:MM)!");
            };
        };
        validateFirstTrain();

        //clear text boxes after submit
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    });


        database.ref().on("child_added", function(childSnapshot) {
            trainName = childSnapshot.val().trainName;
            trainDestination = childSnapshot.val().trainDestination;
            firstTrain = childSnapshot.val().firstTrain;
            trainFrequency = childSnapshot.val().trainFrequency;
            console.log(trainName);

            firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
            console.log(firstTrainConverted);

            //calculate difference between firstTrain and current
            diffTime = moment().diff(moment(firstTrainConverted), "minutes");
            console.log(currentTime);
            console.log(diffTime);

            var remainder = diffTime % trainFrequency;
            console.log(remainder);

            //calculate incoming train and how far away it is

            //minutes until next train arrives
            minutesAway = trainFrequency - remainder;
            console.log(minutesAway);   
            
            nextTrain = moment().add(minutesAway, "minutes");
            nextTrain = moment(nextTrain).format("HH:mm");

            //append and display new row to table
            var trainTable = $(".schedule-table");
            var tableID = 0;
            var deleteBtn = $("<button/>");
            deleteBtn.attr("data-delete", tableID);
            deleteBtn.addClass("deleteRow");

            trainTable.append(
            `<tr><td>` + trainName + `</td>
            <td>` + trainDestination + `</td>
            <td>` + trainFrequency + `</td>
            <td>` + nextTrain + `</td>
            <td>` + minutesAway + `</td></tr>`);

            tableID++;
            
        });
    });
