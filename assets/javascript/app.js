$(document).ready(function() {
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

        var trainTable = $(".schedule-table");
        trainTable.append("<tr><td>" + trainName + "</td><td>" + trainDestination
        + "</td><td>" + trainFrequency + "</td></tr>");
    })

});