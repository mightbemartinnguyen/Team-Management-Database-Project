// App.js
// app url: http://flip3.engr.oregonstate.edu:2121/
/* 
Citation for the following function:
   Date: 3/18/24
   Code is based on the OSU CS340 Nodejs starter app Step 0,1,3,4,5,6,7,8
   With the code used as a template with variables changed and/or other modifications including the inclusion or exclusion of 
   functions/routes.
   Source URL: 
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
   https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

*/
/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 2121;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));         // this is needed to allow for the form to use the ccs style sheet/javscript

/*
    ROUTES
*/

// app.js

app.get('/', function(req, res) {
    res.render('index'); // Render the index template
});

app.get('/players', function(req, res)
    {  
        let query1;
        // Define our query based on user input
        if(req.query.playerName === undefined){
            query1 = "SELECT * FROM Players;";
        }
        else{
            query1 = `SELECT * FROM Players WHERE playerName LIKE "${req.query.playerName}%"`
        }
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('players', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.get('/equipments', function(req, res)
    {  
        let query1;
        // Define our query based on user input
        if(req.query.type === undefined){
            query1 = "SELECT * FROM Equipments;";
        }
        else{
            query1 = `SELECT * FROM Equipments WHERE type LIKE "${req.query.type}%"`
        }
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('equipments', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.get('/coaches', function(req, res)
    {  
        let query1;
        // Define our query based on user input
        if(req.query.coachName === undefined){
            query1 = "SELECT * FROM Coaches;";
        }
        else{
            query1 = `SELECT * FROM Coaches WHERE coachName LIKE "${req.query.coachName}%"`
        }

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('coaches', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.get('/injuries', function(req, res)
    {  
        let query1;
        
        // Define our query based on user input
        if(req.query.injuryName === undefined){
            query1 = "SELECT * FROM Injuries;";
        }
        else{
            query1 = `SELECT * FROM Injuries WHERE injuryName LIKE "${req.query.injuryName}%"`;
        }
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('injuries', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.get('/playersHaveCoaches', function(req, res) {  
    let query1;               // Define our query
    if(req.query.coachName !== undefined&&req.query.playerName !== undefined){
        if (req.query.playerName.trim() !== '' && req.query.coachName.trim() === '') {
            console.log("Player Defined")
            console.log(req.query.playerName);
            query1 =
            `SELECT 
                p.playerID,
                p.playerName,
                c.coachID,
                c.coachName 
            FROM 
                PlayersHaveCoaches phc 
            JOIN 
                Players p ON phc.playerID = p.playerID AND p.playerName LIKE CONCAT("${req.query.playerName}%", '%')
            JOIN 
                Coaches c ON phc.coachID = c.coachID;
            `;
        }
        else if (req.query.coachName.trim() !== ''&& req.query.playerName.trim() === '') {
            console.log("Coach Defined");
            console.log(req.query.coachName);
            query1 = 
            `SELECT 
                p.playerID,
                p.playerName,
                c.coachID,
                c.coachName 
            FROM 
                PlayersHaveCoaches phc 
            JOIN 
                Players p ON phc.playerID = p.playerID
            JOIN 
                Coaches c ON phc.coachID = c.coachID AND c.coachName LIKE CONCAT("${req.query.coachName}%", '%');
            `;
        }
        else if (req.query.coachName.trim() !== '' && req.query.playerName.trim() !== '') {
            console.log("Both Defined");
            console.log(req.query.playerName, req.query.coachName);
            query1 = 
            `SELECT 
                p.playerID,
                p.playerName,
                c.coachID,
                c.coachName 
            FROM 
                PlayersHaveCoaches phc 
            JOIN 
                Players p ON phc.playerID = p.playerID AND p.playerName LIKE CONCAT("${req.query.playerName}%", '%')
            JOIN 
                Coaches c ON phc.coachID = c.coachID AND c.coachName LIKE CONCAT("${req.query.coachName}%", '%');
            `;
        }
        else {
            console.log("nothing");
            query1 = `SELECT p.playerID,p.playerName,c.coachID,c.coachName FROM PlayersHaveCoaches phc JOIN Players p ON phc.playerID = p.playerID JOIN Coaches c ON phc.coachID = c.coachID;`;
        }
    }
    else{
        query1 = `SELECT p.playerID,p.playerName,c.coachID,c.coachName FROM PlayersHaveCoaches phc JOIN Players p ON phc.playerID = p.playerID JOIN Coaches c ON phc.coachID = c.coachID;`;
    }
    
    db.pool.query(query1, function(error, rows, fields) {
        res.render('playersHaveCoaches', {data: rows});
    });
});                                                       // received back from the query

app.get('/playersHaveInjuries', function(req, res)
    {  
        let query1;               // Define our query
        if(req.query.injuryName !== undefined&&req.query.playerName !== undefined){
            if (req.query.playerName.trim() !== '' && req.query.injuryName.trim() === '') {
                console.log("Player Defined");
                console.log(req.query.playerName);
                query1 = `
                SELECT 
                    p.playerID,
                    p.playerName,
                    i.injuryID,
                    i.injuryName
                FROM 
                    PlayersHaveInjuries phi
                JOIN 
                    Players p ON phi.playerID = p.playerID AND p.playerName LIKE CONCAT("${req.query.playerName}%", '%')
                JOIN 
                    Injuries i ON phi.injuryID = i.injuryID;
                `;
            }
            else if (req.query.injuryName.trim() !== ''&& req.query.playerName.trim() === '') {
                console.log("Injury Defined");
                console.log(req.query.injuryName);
                query1 = `
                SELECT 
                    p.playerID,
                    p.playerName,
                    i.injuryID,
                    i.injuryName
                FROM 
                    PlayersHaveInjuries phi
                JOIN 
                    Players p ON phi.playerID = p.playerID
                JOIN 
                    Injuries i ON phi.injuryID = i.injuryID AND i.injuryName LIKE CONCAT("${req.query.injuryName}%", '%');
                `;
            }
            else if (req.query.injuryName.trim() !== '' && req.query.playerName.trim() !== '') {
                console.log("Both Defined");
                console.log(req.query.playerName, req.query.injuryName);
                query1 = `
                SELECT 
                    p.playerID,
                    p.playerName,
                    i.injuryID,
                    i.injuryName
                FROM 
                    PlayersHaveInjuries phi
                JOIN 
                    Players p ON phi.playerID = p.playerID AND p.playerName LIKE CONCAT("${req.query.playerName}%", '%')
                JOIN 
                    Injuries i ON phi.injuryID = i.injuryID AND i.injuryName LIKE CONCAT("${req.query.injuryName}%", '%');
                `;
            }
            else {
                console.log("nothing");
                query1 = `
                SELECT 
                    p.playerID,
                    p.playerName,
                    i.injuryID,
                    i.injuryName
                FROM 
                    PlayersHaveInjuries phi
                JOIN 
                    Players p ON phi.playerID = p.playerID
                JOIN 
                    Injuries i ON phi.injuryID = i.injuryID;
                `;
            }
        }
        else{
            query1 = `
            SELECT 
                p.playerID,
                p.playerName,
                i.injuryID,
                i.injuryName
            FROM 
                PlayersHaveInjuries phi
            JOIN 
                Players p ON phi.playerID = p.playerID
            JOIN 
                Injuries i ON phi.injuryID = i.injuryID;
            `;
        }
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('playersHaveInjuries', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.get('/playersHaveEquipments', function(req, res)
    {  
        let query1;
        if(req.query.type !== undefined&&req.query.playerName !== undefined){
            if (req.query.playerName.trim() !== '' && req.query.type.trim() === '') {
                console.log("Player Defined");
                console.log(req.query.playerName);
                query1 = `
                SELECT 
                    phe.playerID,
                    p.playerName,
                    phe.equipmentID,
                    e.type AS equipmentType
                FROM 
                    PlayersHaveEquipments phe
                JOIN 
                    Players p ON phe.playerID = p.playerID AND p.playerName LIKE CONCAT("${req.query.playerName}%", '%')
                JOIN 
                    Equipments e ON phe.equipmentID = e.equipmentID;
                `;
            }
            else if (req.query.type.trim() !== ''&& req.query.playerName.trim() === '') {
                console.log("Equipment Defined");
                console.log(req.query.type);
                query1 = `
                SELECT 
                    phe.playerID,
                    p.playerName,
                    phe.equipmentID,
                    e.type AS equipmentType
                FROM 
                    PlayersHaveEquipments phe
                JOIN 
                    Players p ON phe.playerID = p.playerID
                JOIN 
                    Equipments e ON phe.equipmentID = e.equipmentID AND e.type LIKE CONCAT("${req.query.type}%", '%');
                `;
            }
            else if (req.query.type.trim() !== '' && req.query.playerName.trim() !== '') {
                console.log("Both Defined");
                console.log(req.query.playerName, req.query.type);
                query1 = `
                SELECT 
                    phe.playerID,
                    p.playerName,
                    phe.equipmentID,
                    e.type AS equipmentType
                FROM 
                    PlayersHaveEquipments phe
                JOIN 
                    Players p ON phe.playerID = p.playerID AND p.playerName LIKE CONCAT("${req.query.playerName}%", '%')
                JOIN 
                    Equipments e ON phe.equipmentID = e.equipmentID AND e.type LIKE CONCAT("${req.query.type}%", '%');
                `;
            }
            else {
                console.log("nothing");
                query1 =`
                SELECT 
                    phe.playerID,
                    p.playerName,
                    phe.equipmentID,
                    e.type AS equipmentType
                FROM 
                    PlayersHaveEquipments phe
                JOIN 
                    Players p ON phe.playerID = p.playerID
                JOIN 
                    Equipments e ON phe.equipmentID = e.equipmentID;
                `;;
            }
        }
        else{
            query1=`
            SELECT 
                phe.playerID,
                p.playerName,
                phe.equipmentID,
                e.type AS equipmentType
            FROM 
                PlayersHaveEquipments phe
            JOIN 
                Players p ON phe.playerID = p.playerID
            JOIN 
                Equipments e ON phe.equipmentID = e.equipmentID;
            `;// Define our query
        }               

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('playersHaveEquipments', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

    app.post('/add-player-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
        let jerseyNum = parseInt(data.jerseyNum);
        if (isNaN(jerseyNum)) {
            jerseyNum = 'NULL';
        }
        
        let weight = parseInt(data.weight);
        if (isNaN(weight)) {
             weight = 'NULL';
        }
        
        let score = parseInt(data.score);
        if (isNaN(score)) {
            score = 'NULL';
        }
        
        // Create the query and run it on the database
        let query1 = `INSERT INTO Players (playerName, jerseyNum, height, weight, position, score) 
        VALUES ('${data.playerName}', ${jerseyNum},'${data.height}', ${weight}, '${data.position}', ${score})`;
        db.pool.query(query1, function(error, rows, fields){
        
            // Check to see if there was an error
            if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, render the players page again with the updated data
            else{
                let query2 = "SELECT * FROM Players;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    });

    app.post('/add-equipment-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
        let condition = parseInt(data.condition);
        if (isNaN(condition)) {
            condition = 'NULL';
        }
        
        let numOfType = parseInt(data.numOfType);
        if (isNaN(numOfType)) {
            numOfType = 'NULL';
        }
        
        let replacementCost = parseFloat(data.replacementCost);
        if (isNaN(replacementCost)) {
            replacementCost = 'NULL';
        }
        
        // Create the query and run it on the database
        let query1 = `INSERT INTO Equipments (type, \`condition\`, numOfType, replacementCost)
        VALUES ('${data.type}', '${condition}', '${numOfType}', '${replacementCost}')`;  
        db.pool.query(query1, function(error, rows, fields){
        
            // Check to see if there was an error
            if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, render the players page again with the updated data
            else{
                let query2 = "SELECT * FROM Equipments;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    });

    app.post('/add-coach-ajax', function(req, res) {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        let numOfYearCoaching = parseFloat(data.numOfYearCoaching);
        if (isNaN(numOfYearCoaching)) {
            numOfYearCoaching = null; // Set to null instead of 'NULL'
        }
    
        // Create the query and run it on the database
        let query1 = `INSERT INTO Coaches (coachName, title, numOfYearCoaching)
        VALUES ('${data.coachName}', ${data.title}, ${numOfYearCoaching})`; // Using placeholders to prevent SQL injection
        db.pool.query(query1, function(error, rows, fields){
        
            // Check to see if there was an error
            if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, render the players page again with the updated data
            else{
                let query2 = "SELECT * FROM Coaches;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    });

    app.post('/add-injury-ajax', function(req, res) {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        let avgRecoveryTime = parseFloat(data.avgRecoveryTime);
        if (isNaN(avgRecoveryTime)) {
            avgRecoveryTime = null; // Set to null instead of 'NULL'
        }
    
        // Create the query and run it on the database
        let query1 = `INSERT INTO Injuries (injuryName, avgRecoveryTime)
        VALUES ('${data.injuryName}', ${avgRecoveryTime})`; // Using placeholders to prevent SQL injection
        db.pool.query(query1, function(error, rows, fields){
        
            // Check to see if there was an error
            if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, render the players page again with the updated data
            else{
                let query2 = "SELECT * FROM Injuries;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    });
    app.post('/add-playersHaveCoaches-ajax', function(req, res) {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
        // Create the query and run it on the database
        let query1 = `INSERT INTO PlayersHaveCoaches (playerID, coachID)
        SELECT
            (SELECT playerID FROM Players WHERE playerName LIKE CONCAT("${data.playerID}%", '%')),
            (SELECT coachID FROM Coaches WHERE coachName LIKE CONCAT("${data.coachID}%", '%'));`; // Using placeholders to prevent SQL injection
        db.pool.query(query1, function(error, rows, fields){
        
            // Check to see if there was an error
            if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, render the players page again with the updated data
            else{
                let query2 = "SELECT * FROM PlayersHaveCoaches;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    });

    app.post('/add-playersHaveInjuries-ajax', function(req, res) {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
        // Create the query and run it on the database
        let query1 = `INSERT INTO PlayersHaveInjuries (playerID, injuryID)
        SELECT
            (SELECT playerID FROM Players WHERE playerName LIKE CONCAT("${data.playerID}%", '%')),
            (SELECT injuryID FROM Injuries WHERE injuryName LIKE CONCAT("${data.injuryID}%", '%'));`; // Using placeholders to prevent SQL injection
        db.pool.query(query1, function(error, rows, fields){
        
            // Check to see if there was an error
            if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, render the players page again with the updated data
            else{
                let query2 = "SELECT * FROM PlayersHaveInjuries;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    });
    
    app.post('/add-playersHaveEquipments-ajax', function(req, res) {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
        // Create the query and run it on the database
        let query1 = `INSERT INTO PlayersHaveEquipments (playerID, equipmentID)
        SELECT
            (SELECT playerID FROM Players WHERE playerName LIKE CONCAT("${data.playerID}%", '%')),
            (SELECT equipmentID FROM Equipments WHERE type LIKE CONCAT("${data.equipmentID}%", '%'));`; // Using placeholders to prevent SQL injection
        db.pool.query(query1, function(error, rows, fields){
        
            // Check to see if there was an error
            if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, render the players page again with the updated data
            else{
                let query2 = "SELECT * FROM PlayersHaveEquipments;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    });
    
    app.delete('/delete-player-ajax/',function(req,res,next){
        console.log("In Delete");
        let data = req.body;
        let playerID = parseInt(data.id);
        let deletePlayers = `DELETE FROM Players WHERE playerID = ?`;
    
        db.pool.query(deletePlayers,[playerID],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.sendStatus(204);
            }
        })
    });

    app.delete('/delete-equipment-ajax/',function(req,res,next){
        console.log("In Delete");
        let data = req.body;
        let equipmentID = parseInt(data.id);
        let deleteEquipments = `DELETE FROM Equipments WHERE equipmentID = ?`;
    
        db.pool.query(deleteEquipments,[equipmentID],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.sendStatus(204);
            }
        })
    });

    app.delete('/delete-coach-ajax/',function(req,res,next){
        console.log("In Delete");
        let data = req.body;
        let coachID = parseInt(data.id);
        let deleteCoaches = `DELETE FROM Coaches WHERE coachID = ?`;
    
        db.pool.query(deleteCoaches,[coachID],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.sendStatus(204);
            }
        })
    });

    app.delete('/delete-injury-ajax/',function(req,res,next){
        console.log("In Delete");
        let data = req.body;
        let injuryID = parseInt(data.id);
        let deleteInjuries = `DELETE FROM Injuries WHERE injuryID = ?`;
    
        db.pool.query(deleteInjuries,[injuryID],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.sendStatus(204);
            }
        })
    });

    app.delete('/delete-playersHaveCoaches-ajax/',function(req,res,next){
        console.log("In Delete");
        let data = req.body;
        let playerID = parseInt(data.pid);
        let coachID = parseInt(data.id);
        let deletePlayersHaveCoaches = `DELETE FROM PlayersHaveCoaches WHERE playerID = ? && coachID = ?`;
        console.log(playerID + " " + coachID);
        db.pool.query(deletePlayersHaveCoaches,[playerID,coachID],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.sendStatus(204);
            }
        })
    });

    app.delete('/delete-playersHaveInjuries-ajax/',function(req,res,next){
        console.log("In Delete");
        let data = req.body;
        let playerID = parseInt(data.pid);
        let injuryID = parseInt(data.id);
        let deletePlayersHaveInjuries = `DELETE FROM PlayersHaveInjuries WHERE playerID = ? && injuryID = ?`;
    
        db.pool.query(deletePlayersHaveInjuries,[playerID,injuryID],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.sendStatus(204);
            }
        })
    });

    app.delete('/delete-playersHaveEquipments-ajax/',function(req,res,next){
        console.log("In Delete");
        let data = req.body;
        let equipmentID = parseInt(data.id);
        let playerID = parseInt(data.pid);
        let deletePlayersHaveEquipments = `DELETE FROM PlayersHaveEquipments WHERE playerID = ? && equipmentID = ?`;
    
        db.pool.query(deletePlayersHaveEquipments,[playerID,equipmentID],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.sendStatus(204);
            }
        })
    });
    
    app.put('/edit-player-ajax', function(req, res, next) {
        console.log("In Edit");
        let data = req.body;
        
        let oldPlayerName = data.currPlayerName;
        let playerName = data.playerName;
        let jerseyNum = parseInt(data.jerseyNum);
        if (isNaN(jerseyNum)) {
            jerseyNum = null; // Assign null for NULL values
        }
        let height = data.height;
    
        let weight = parseInt(data.weight);
        if (isNaN(weight)) {
            weight = null; // Assign null for NULL values
        }
        let position = data.position;
        let score = parseInt(data.score);
        if (isNaN(score)) {
            score = null; // Assign null for NULL values
        }
    
        let queryUpdatePlayer = `UPDATE Players SET playerName = ?, jerseyNum = ?, height = ?, weight = ?, position = ?, score = ? WHERE playerID IN (SELECT playerID FROM Players WHERE playerName LIKE "${oldPlayerName}");`;
        db.pool.query(queryUpdatePlayer, [playerName, jerseyNum, height, weight, position, score], function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                console.log(rows)
                let query2 = "SELECT * FROM Players;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else { 
                        res.send(rows);
                    }
                });
            }
        });
    });

    app.put('/edit-equipment-ajax',function(req,res,next){
        console.log("In Edit");
        let data = req.body;
        
        let oldEquipType = data.currEquipmentType;
        let type = data.type;
        let condition = parseInt(data.condition);
        if (isNaN(condition)) {
            condition = 'NULL';
       }
        let numOfType = parseInt(data.numOfType);
        if (isNaN(numOfType)) {
            numOfType = 'NULL';
        }
        let replacementCost = parseFloat(data.replacementCost);
        if (isNaN(replacementCost)) {
            replacementCost = 'NULL';
        }
    
        let queryUpdateEquipment = `UPDATE Equipments SET type = ?, \`condition\` = ?, numOfType = ?, replacementCost = ? WHERE equipmentID IN (SELECT equipmentID FROM Equipments WHERE type LIKE "${oldEquipType}");`;
        db.pool.query(queryUpdateEquipment,[type,condition,numOfType,replacementCost],function(error,rows,fields){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                
                let query2 = "SELECT * FROM Equipments;"; // Query to fetch updated player data
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400); // Bad request
                    } else {     
                        res.send(rows);
                    }
                })
            }
        })
    
    });

    app.put('/edit-coach-ajax', function(req, res, next) {
        console.log("In Edit");
        let data = req.body;
        
        let oldCoachName = data.currCoachName;
        let coachName = data.coachName;
        let title = data.title;
        let numOfYearCoaching = parseInt(data.numOfYearCoaching);
        if (isNaN(numOfYearCoaching)) {
            numOfYearCoaching = null; // Set to null instead of 'NULL'
        }
    
        let queryUpdateCoach = `UPDATE Coaches SET coachName = ?, title = ?, numOfYearCoaching = ? WHERE coachID IN (SELECT coachID FROM Coaches WHERE coachName LIKE "${oldCoachName}");`;
        db.pool.query(queryUpdateCoach, [coachName, title, numOfYearCoaching], function(error, result) {
            if (error) {
                console.log(error);
                res.sendStatus(400); // Bad request
            } else {
                let selectQuery = "SELECT * FROM Coaches"; // Query to fetch updated coach data
                db.pool.query(selectQuery, function(err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400); // Bad request
                    } else {
                        res.send(rows); // Send updated coach data back to the client
                    }
                });
            }
        });
    });

    app.put('/edit-injury-ajax', function(req, res, next) {
        console.log("In Edit");
        let data = req.body;
        
        let oldInjuryName = data.currInjuryName;
        let injuryName = data.injuryName;
        let avgRecoveryTime = parseFloat(data.avgRecoveryTime);
        if (isNaN(avgRecoveryTime)) {
            avgRecoveryTime = null; // Set to null instead of 'NULL'
        }
    
        let queryUpdateInjury = `UPDATE Injuries SET injuryName = ?, avgRecoveryTime = ? WHERE injuryID IN (SELECT injuryID FROM Injuries WHERE injuryName LIKE "${oldInjuryName}");`;
        db.pool.query(queryUpdateInjury, [injuryName, avgRecoveryTime], function(error, result) {
            if (error) {
                console.log(error);
                res.sendStatus(400); // Bad request
            } else {
                let selectQuery = "SELECT * FROM Injuries"; // Query to fetch updated coach data
                db.pool.query(selectQuery, function(err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400); // Bad request
                    } else {
                        res.send(rows); // Send updated coach data back to the client
                    }
                });
            }
        });
    });
    
    app.put('/edit-playersHaveCoaches-ajax/',function(req,res,next){
        console.log("In Edit");
        let data = req.body;
        let oldCoachName = data.currCoachID;
        let oldPlayerName = data.currPlayerID;
        let newCoachName = data.coachID;
        let newPlayerName = data.playerID;
        console.log(oldCoachName+""+oldPlayerName);

        let queryUpdatePlayerOrCoach = `
        UPDATE PlayersHaveCoaches 
        SET coachID = (SELECT coachID FROM Coaches WHERE coachName LIKE '${newCoachName}'),
            playerID = (SELECT playerID FROM Players WHERE playerName LIKE '${newPlayerName}')
        WHERE 
            playerID = (SELECT playerID FROM Players WHERE playerName LIKE '${oldPlayerName}') AND 
            coachID = (SELECT coachID FROM Coaches WHERE coachName LIKE '${oldCoachName}');
    `;
        
        db.pool.query(queryUpdatePlayerOrCoach,function(error,result){
            if(error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                let selectQuery = `SELECT p.playerID,p.playerName,c.coachID,c.coachName FROM PlayersHaveCoaches phc JOIN Players p ON phc.playerID = p.playerID JOIN Coaches c ON phc.coachID = c.coachID;`
                db.pool.query(selectQuery,function(err,rows,fields){
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                });
            }
        });
    });
    /*
        LISTENER
    */
    app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
        console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
    });