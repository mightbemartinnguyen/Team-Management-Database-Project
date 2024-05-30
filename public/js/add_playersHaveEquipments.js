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
let addPlayersHaveEquipmentsForm = document.getElementById('add-playersHaveEquipments-form-ajax');

// Modify the objects we need
addPlayersHaveEquipmentsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlayersHaveEquipmentsPlayerID = document.getElementById("input-playersHaveEquipments-playerID");
    let inputPlayersHaveEquipmentsEquipmentID = document.getElementById("input-playersHaveEquipments-equipmentID");


    // Get the values from the form fields
    let playerIDValue = inputPlayersHaveEquipmentsPlayerID.value;
    let equipmentIDValue = inputPlayersHaveEquipmentsEquipmentID.value;

    // Put our data we want to send in a javascript object
    let data = {
        playerID: playerIDValue,
        equipmentID: equipmentIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-playersHaveEquipments-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPlayersHaveEquipmentsPlayerID.value = '';
            inputPlayersHaveEquipmentsEquipmentID.value = '';
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
    let currentTable = document.getElementById("playersHaveEquipments-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData; 

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let playerIDCell = document.createElement("TD");
    let equipmentIDCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");



    // Fill the cells with correct data
    playerIDCell.innerText = newRow.playerID;
    equipmentIDCell.innerText = newRow.equipmentID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePlayersHaveEquipments(newRow.equipmentID);
    };

    location.reload();


     // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    
    // Add the row to the table
    currentTable.appendChild(row);
}