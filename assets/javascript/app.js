$(document).ready(function() {
    function displayClock() {
    var currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var timer = setTimeout(displayClock, 500);

    minute = checkTime(minute);
    seconds = checkTime(seconds);

    $("#displayTime").text("Current Time: " + hour + ":" + minute + ":" + seconds)
    };

    function checkTime(i) {
        if (i < 10) {i = "0" + i};
        return i;
    };

    displayClock();


    $("#add-train").on("click", function(event) {
        event.preventDefault();

        //pull and store values from input form
        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();
        
        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTrainTime);
        console.log(trainFrequency);

        var nextTrain;
        var minutesAway;

        var trainTable = $(".schedule-table");
        trainTable.append("<tr><td>" + trainName + "</td><td>" + trainDestination
        + "</td><td>" + trainFrequency + "</td></tr>");
    })

});