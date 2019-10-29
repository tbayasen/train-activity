$(document).ready(function() {
    //initialize global variables
    var trainName = "";
    var trainDestination = "";
    var firstTrain = "";
    var trainFrequency = "";
    var nextTrain = "";
    var minutesAway = "";
    var currentTime = ""

    function displayClock() {
        currentTime = moment();
        currentTime = moment(currentTime).format("hh:mm:ss A")
        $("#displayTime").text("Current Time: " + currentTime);
        timer =setTimeout(displayClock, 500)
    }

    // function displayClock() {
    //     currentTime = new Date();
    //     hour = currentTime.getHours();
    //     minute = currentTime.getMinutes();
    //     seconds = currentTime.getSeconds();
    //     timer = setTimeout(displayClock, 500);

    //     minute = checkTime(minute);
    //     seconds = checkTime(seconds);

    //     $("#displayTime").text("Current Time: " + hour + ":" + minute + ":" + seconds)
    //     return minute;
    // };

    // function checkTime(i) {
    //     if (i < 10) {i = "0" + i};
    //     return i;
    // };

    displayClock();


    $("#add-train").on("click", function(event) {
        event.preventDefault();

        //pull and store values from input form
        trainName = $("#train-name").val().trim();
        trainDestination = $("#destination").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        trainFrequency = $("#frequency-input").val().trim();
        
        // console.log(trainName);
        // console.log(trainDestination);
        // console.log(firstTrainTime);
        // console.log(trainFrequency);

        nextTrain;
        minutesAway;

        function calcNextTrain(minute) {
            var nextTrainTime = minute + trainFrequency;
            console.log(nextTrainTime);
            
        }
        calcNextTrain();

        var trainTable = $(".schedule-table");
        trainTable.append("<tr><td>" + trainName + "</td><td>" + trainDestination
        + "</td><td>" + trainFrequency + "</td></tr>");
    })

});