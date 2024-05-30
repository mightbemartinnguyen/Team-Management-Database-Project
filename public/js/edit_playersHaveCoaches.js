/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app Step 8
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
console.log("Hello (outside)");
// Get the objects we need to modify
let editPlayersHaveCoachesForm = document.getElementById('edit-playersHaveCoaches-form-ajax');
// Modify the objects we need
editPlayersHaveCoachesForm.addEventListener("submit", function (e) {
    console.log("Hello");
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCurrPlayerID = document.getElementById("edit-input-playersHaveCoaches-currplayerID");
    let inputPlayersHaveCoachesPlayerID = document.getElementById("edit-input-playersHaveCoaches-playerID");
    let inputCurrCoachID = document.getElementById("edit-input-playersHaveCoaches-currcoachID")
    let inputPlayersHaveCoachesCoachID = document.getElementById("edit-input-playersHaveCoaches-coachID");

    
    // Get the values from the form fields
    let currPlayerIDValue = inputCurrPlayerID.value;
    let playerIDValue = inputPlayersHaveCoachesPlayerID.value;
    let currCoachIDValue = inputCurrCoachID.value;
    let coachIDValue = inputPlayersHaveCoachesCoachID.value;

    if(currPlayerIDValue==null||currCoachIDValue==null){
        return;
    }
    // Put our data we want to send in a javascript object
    let data = {
        currPlayerID:currPlayerIDValue,
        playerID: playerIDValue,
        currCoachID: currCoachIDValue,
        coachID: coachIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit-playersHaveCoaches-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response,currCoachIDValue,currPlayerIDValue);
            console.log("Checking.");
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

function updateRow(data,coachID,playerID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("playersHaveCoaches-table");
    for(let i=0,row;row=table.rows[i];i++){
        if(table.rows[i].getAttribute("data-value")==coachID&&table.rows[i].getAttribute("data-value")==playerID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let playerIDTD = updateRowIndex.getElementsByTagName("td")[1];
            let coachIDTD = updateRowIndex.getElementsByTagName("td")[3];
            playerIDTD.innerHTML = parsedData[1].name;
            coachIDTD.innerHTML = parsedData[3].name;
        }
    }
}
