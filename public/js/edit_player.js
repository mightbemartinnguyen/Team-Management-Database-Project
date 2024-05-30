/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app Step 8
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
let updatePlayerForm = document.getElementById('edit-player-form-ajax');

updatePlayerForm.addEventListener("submit",function(e){
    console.log("In Edit Js")
    e.preventDefault();
    let inputOldPlayerName = document.getElementById("edit-input-oldPlayerName");
    let inputPlayerName = document.getElementById("edit-input-playerName");
    let inputJerseyNum = document.getElementById("edit-input-jerseyNum");
    let inputHeight = document.getElementById("edit-input-height");
    let inputWeight = document.getElementById("edit-input-weight");
    let inputPosition = document.getElementById("edit-input-position");
    let inputScore = document.getElementById("edit-input-score");

    let oldNameValue = inputOldPlayerName.value;
    let playerNameValue = inputPlayerName.value;
    let jerseyNumValue = inputJerseyNum.value;
    let heightValue = inputHeight.value;
    let weightValue = inputWeight.value;
    let positionValue = inputPosition.value;
    let scoreValue = inputScore.value;

    if(oldNameValue==null){
        return;
    }

    let data = {
        currPlayerName : oldNameValue,
        playerName: playerNameValue,
        jerseyNum: jerseyNumValue,
        height: heightValue,
        weight: weightValue,
        position: positionValue,
        score: scoreValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT","/edit-player-ajax",true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = ()=> {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            updateRow(xhttp.response,idValue);
            console.log("Checking.");
            location.reload(); // Reload the page after successfully updating the row
        }
        else if(xhttp.readyState == 4 && xhttp.status != 200){
            console.log("Error in input.");
        }
    }
    xhttp.send(JSON.stringify(data));

});

function updateRow(data, playerID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("players-table");
    for(let i = 0, row; row = table.rows[i]; i++){
        if(table.rows[i].getAttribute("data-value") == playerID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let nameTD = updateRowIndex.getElementsByTagName("td")[1];
            let jerseyTD = updateRowIndex.getElementsByTagName("td")[2];
            let heightTD = updateRowIndex.getElementsByTagName("td")[3];
            let weightTD = updateRowIndex.getElementsByTagName("td")[4];
            let positionTD = updateRowIndex.getElementsByTagName("td")[5];
            let scoreTD = updateRowIndex.getElementsByTagName("td")[6];

            nameTD.innerHTML = parsedData.playerName;
            jerseyTD.innerHTML = parsedData.jerseyNum;
            heightTD.innerHTML = parsedData.height;
            weightTD.innerHTML = parsedData.weight;
            positionTD.innerHTML = parsedData.position;
            scoreTD.innerHTML = parsedData.score;
        }
    }
    
}