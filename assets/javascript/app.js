$(document).ready(function() {
    //initialize global variables
    var trainName = "";
    var trainDestination = "";
    var firstTrain = "";
    var trainFrequency = "";
    var nextTrain = "";
    var minutesAway = "";
    var currentTime = "";

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

        //form validation
        if (trainName === '') {
            alert("Train name input is not valid.");
            $("#train-name").css("background-color", "pink");
        }

        if (trainDestination === '') {
            alert("Destination input is not valid.");
            $("#destination").css("background-color", "pink");
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

        //check trainFrequency input for valid MM input
        function validateFrequency() {
            var isValid = /^([0-5][0-9])?$/.test(trainFrequency);
            console.log(isValid)
            if (isValid) {
                $("#frequency-input").css("background-color", "white");
            }
            else {
                $("#frequency-input").css("background-color", "pink");
                alert("Train frequency input is not valid. Please enter the a time in minutes(MM)!");
            };
        };
        validateFrequency();


        //calculate incoming train and how far away it is
        function calcNextTrain() {
            //initialize variables
            var remainder = '';

            firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
            console.log(firstTrainConverted);
            //time difference between first train and current time
            diffTime = moment().diff(moment(firstTrainConverted), "minutes");
            console.log(currentTime);
            console.log(diffTime);

            remainder = diffTime % trainFrequency;
            console.log(remainder);

            //minutes until next train arrives
            minutesAway = trainFrequency - remainder;
            console.log(minutesAway);   

            nextTrain = moment().add(minutesAway, "minutes");
            nextTrain = moment(nextTrain).format("HH:mm");
        };
        calcNextTrain(); 

        //append and display new row to table
        var trainTable = $(".schedule-table");
        trainTable.append(
        `<tr><td>` + trainName + `</td>
        <td>` + trainDestination+ `</td>
        <td>` + trainFrequency + `</td>
        <td>` + nextTrain + `</td>
        <td>` + minutesAway + `</td></tr>`);
        
        $("td:nth-child(5)").each(function(i) {
            $("td:nth-child(5)").attr("id", "minutesAway" + (i + 1));
        });
        
        //update mins away html every minute
        function updateMinAway() {
            $("#train")
            timer = setTimeout(updateMinAway, 3000)
            console.log(minutesAway);
        }
        updateMinAway();

        //clear text boxes after submit
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    });

});