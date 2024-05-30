/*
Citation for the following function:
   Date: 3/18/24
   Adapted from the OSU CS340 Nodejs starter app Step 8
   Starter code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
let updateEquipmentForm = document.getElementById('edit-equipment-form-ajax');

updateEquipmentForm.addEventListener("submit",function(e){
    e.preventDefault();
    let inputOldEquipType = document.getElementById("edit-input-oldEquipType");
    let inputType = document.getElementById("edit-input-type");
    let inputCondition = document.getElementById("edit-input-condition");
    let inputNumOfType = document.getElementById("edit-input-numOfType");
    let inputReplacementCost = document.getElementById("edit-input-replacementCost");

    let oldTypeValue = inputOldEquipType.value;
    let typeValue = inputType.value;
    let conditionValue = inputCondition.value;
    let numOfTypeValue = inputNumOfType.value;
    let replacementCostValue = inputReplacementCost.value;

    if(oldTypeValue==null){
        return;
    }

    let data = {
        currEquipmentType : oldTypeValue,
        type: typeValue,
        condition: conditionValue,
        numOfType: numOfTypeValue,
        replacementCost: replacementCostValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT","/edit-equipment-ajax",true);
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

function updateRow(data,equipmentID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("equipments-table");
    for(let i=0,row;row=table.rows[i];i++){
        if(table.rows[i].getAttribute("data-value")==equipmentID){
            let updateRowIndex =table.getElementsByTagName("tr")[i];

            let typeTD= updateRowIndex.getElementsByTagName("td")[1];
            let conditionTD= updateRowIndex.getElementsByTagName("td")[2];
            let numOfTypeTD= updateRowIndex.getElementsByTagName("td")[3];
            let replacementCostTD= updateRowIndex.getElementsByTagName("td")[4];
         

            typeTD.innerHTML = parsedData[1].name;
            conditionTD.innerHTML = parsedData[2].name;
            numOfTypeTD.innerHTML = parsedData[3].name;
            replacementCostTD.innerHTML = parsedData[4].name;
        }
    }
}