/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app Step 8
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
let updateCoachForm = document.getElementById('edit-coach-form-ajax');

updateCoachForm.addEventListener("submit",function(e){
    e.preventDefault();
    let inputOldCoachName = document.getElementById("edit-input-oldCoachName");
    let inputCoachName = document.getElementById("edit-input-coachName");
    let inputTitle = document.getElementById("edit-input-title");
    let inputNumOfYearCoaching = document.getElementById("edit-input-numOfYearCoaching");
  
    let oldCoachValue = inputOldCoachName.value;
    let coachNameValue = inputCoachName.value;
    let titleValue = inputTitle.value;
    let numOfYearCoachingValue = inputNumOfYearCoaching.value;

    if(oldCoachValue==null){
        return;
    }

    let data = {
        currCoachName : oldCoachValue,
        coachName: coachNameValue,
        title: `${titleValue}`,
        numOfYearCoaching: numOfYearCoachingValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT","/edit-coach-ajax",true);
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

function updateRow(data, coachID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("coaches-table");
    for(let i = 0, row; row = table.rows[i]; i++){
        if(table.rows[i].getAttribute("data-value") == coachID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let coachNameTD = updateRowIndex.getElementsByTagName("td")[1];
            let titleTD = updateRowIndex.getElementsByTagName("td")[2];
            let numOfYearCoachingTD = updateRowIndex.getElementsByTagName("td")[3];

            coachNameTD.innerHTML = parsedData.coachName;
            titleTD.innerHTML = parsedData.title;
            numOfYearCoachingTD.innerHTML = parsedData.numOfYearCoaching;
        }
    } 
}