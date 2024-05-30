/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app Step 8
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
let updateInjuryForm = document.getElementById('edit-injury-form-ajax');

updateInjuryForm.addEventListener("submit",function(e){
    e.preventDefault();
    let inputOldInjuryName = document.getElementById("edit-input-oldInjuryName");
    let inputInjuryName = document.getElementById("edit-input-injuryName");
    let inputAvgRecoveryTime = document.getElementById("edit-input-avgRecoveryTime");
  

    let oldInjuryValue = inputOldInjuryName.value;
    let injuryNameValue = inputInjuryName.value;
    let avgRecoveryTimeValue = inputAvgRecoveryTime.value;

    if(oldInjuryValue==null){
        return;
    }

    let data = {
        currInjuryName: oldInjuryValue,
        injuryName: injuryNameValue,
        avgRecoveryTime: avgRecoveryTimeValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT","/edit-injury-ajax",true);
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

function updateRow(data, injuryID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("injuries-table");
    for(let i = 0, row; row = table.rows[i]; i++){
        if(table.rows[i].getAttribute("data-value") == injuryID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let nameTD = updateRowIndex.getElementsByTagName("td")[1];
            let avgRecoveryTimeTD = updateRowIndex.getElementsByTagName("td")[2];

            nameTD.innerHTML = parsedData[1].name;
            avgRecoveryTimeTD.innerHTML = parsedData[2].name;
        }
    }
    
}