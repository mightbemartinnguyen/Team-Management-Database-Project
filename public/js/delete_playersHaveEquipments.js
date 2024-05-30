/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app Step 7
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
function deletePlayersHaveEquipments(playerID,equipmentID){
    if (isNaN(equipmentID) || equipmentID === undefined||isNaN(equipmentID) || equipmentID === undefined) {
        console.error('Invalid equipmentID:', equipmentID);
        alert('Invalid Equipment ID.');
        return; // Stop the function if coachID is not a number or undefined
    }
    let link = 'delete-playersHaveEquipments-ajax/';
    let data = {
        pid: playerID,
        id: equipmentID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data), 
        contentType: "application/json; charset=utf-8",
        success: function(result){
            deleteRow(playerID,equipmentID);
            location.reload();
        }
    });
}


function deleteRow(playerID,equipmentID){
    let table = document.getElementById("playersHaveEquipments-table");
    for(let i=0,row;row=table.rows[i];i++){
        if(table.rows[i].getAttribute("data-value")==playerID&&table.rows[i].getAttribute("data-value")==equipmentID){
            table.deleteRow(i);
            break;
        }
    }
}