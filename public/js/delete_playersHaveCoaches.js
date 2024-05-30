/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app Step 7
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
function deletePlayersHaveCoaches(playerID,coachID){
    if (isNaN(coachID) || coachID === undefined||isNaN(playerID)|| playerID === undefined) {
        console.error('Invalid coachID:', coachID);
        alert('Invalid Coach ID.');
        return; // Stop the function if coachID is not a number or undefined
    }
    let link = 'delete-playersHaveCoaches-ajax/';
    let data = {
        pid:playerID,
        id: coachID
        
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data), 
        contentType: "application/json; charset=utf-8",
        success: function(result){
            deleteRow(playerID,coachID);
            location.reload();
        }
    });
}


function deleteRow(playerID,coachID){
    let table = document.getElementById("playersHaveCoaches-table");
    for(let i=0,row;row=table.rows[i];i++){
        if(table.rows[i].getAttribute("data-value")==playerID&&table.rows[i].getAttribute("data-value")==coachID){
            table.deleteRow(i);
            break;
        }
    }
}