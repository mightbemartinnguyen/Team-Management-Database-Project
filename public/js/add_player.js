/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app step 5
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addPlayerForm = document.getElementById('add-player-form-ajax');

// Modify the objects we need
addPlayerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlayerName = document.getElementById("input-playerName");
    let inputJerseyNum = document.getElementById("input-jerseyNum");
    let inputHeight = document.getElementById("input-height");
    let inputWeight = document.getElementById("input-weight");
    let inputPosition = document.getElementById("input-position");
    let inputScore = document.getElementById("input-score");

    // Get the values from the form fields
    let playerNameValue = inputPlayerName.value;
    let jerseyNumValue = inputJerseyNum.value;
    let heightValue = inputHeight.value;
    let weightValue = inputWeight.value;
    let positionValue = inputPosition.value;
    let scoreValue = inputScore.value;

    // Put our data we want to send in a javascript object
    let data = {
        playerName: playerNameValue,
        jerseyNum: jerseyNumValue,
        height: heightValue,
        weight: weightValue,
        position: positionValue,
        score: scoreValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-player-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPlayerName.value = '';
            inputJerseyNum.value = '';
            inputHeight.value = '';
            inputWeight.value = '';
            inputPosition.value='';
            inputScore.value='';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("players-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let playerIDCell = document.createElement("TD");
    let playerNameCell = document.createElement("TD");
    let jerseyNumCell = document.createElement("TD");
    let heightCell = document.createElement("TD");
    let weightCell = document.createElement("TD");
    let positionCell = document.createElement("TD");
    let scoreCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");




    // Fill the cells with correct data
    playerIDCell.innerText = newRow.playerID;
    playerNameCell.innerText = newRow.playerName;
    jerseyNumCell.innerText = newRow.jerseyNum;
    heightCell.innerText = newRow.height;
    weightCell.innerText = newRow.weight;
    positionCell.innerText = newRow.position;
    scoreCell.innerText = newRow.score;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePlayer(newRow.playerID);
    };


    // Add the cells to the row 
    location.reload();

     // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    
    // Add the row to the table
    currentTable.appendChild(row);
}