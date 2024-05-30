-- Data manipulation queries for Group 83


-- Select queries to get all the information from the base data tables
Select * FROM Players;
Select * FROM Coaches;
Select * FROM Equipments;
Select * FROM Injuries;

-- SELECT playerName, injuryName, avgRecoveryTime from Players and Injuries tables based on ID's found in PlayersHaveInjuries

SELECT PlayersHaveInjuries.playerID,PlayersHaveInjuries.injuryID,Players.playerName,Injuries.injuryName,Injuries.avgRecoveryTime FROM PlayersHaveInjuries
JOIN Players ON PlayersHaveInjuries.playerID = Players.playerID
JOIN Injuries ON PlayersHaveInjuries.injuryID = Injuries.injuryID
GROUP BY PlayersHaveInjuries.playerID
ORDER BY playerID DESC;

-- SELECT playerName, coachName and title from Players and Coaches table based on ID's found in PlayersHaveCoaches
SELECT PlayersHaveCoaches.playerID, PlayersHaveCoaches.coachID, Players.playerName,Coaches.coachName,Coaches.title FROM PlayersHaveCoaches
JOIN Players ON PlayersHaveCoaches.playerID = Players.playerID
JOIN Coaches ON PlayersHaveCoaches.coachID = Coaches.coachID
GROUP BY PlayersHaveCoaches.playerID
ORDER BY playerID DESC;

-- SELECT playerName,equipment type and equipment condition from Players and Equipments table based on ID's found in PlayersHaveEquipments

SELECT PlayersHaveEquipments.playerID, PlayersHaveEquipments.equipmentID, Players.playerName, Equipments.type,Equipments.condition FROM PlayersHaveEquipments
JOIN Players ON PlayersHaveEquipments.playerID = Players.playerID
JOIN Equipments ON PlayersHaveEquipments.equipmentID = Equipments.equipmentID
GROUP BY PlayersHaveEquipments.playerID
ORDER BY playerID DESC;

-- user input insert into Players
INSERT INTO `Players` (`playerName`, `jerseyNum`, `height`, `weight`, `position`, `score`)
VALUES(:playerNameInput,:equipmentIDInput,:jerseyNumInput,:heightInput,:weightInput,:positionInput,:scoreInput);

-- user input insert into Coaches
INSERT INTO `Coaches` (`coachName`, `title`, `numOfYearCoaching`)
VALUES(:coachNameInput,:titleInput,:numOfYearCoachingInput);

-- user input insert into Equipments
INSERT INTO  `Equipments` (`type`, `condition`, `numOfType`, `replacementCost`)
VALUE(:typeInput,:conditionInput,:numOfTypeInput,:replacementCostInput);
-- user input insert into Injuries
INSERT INTO `Injuries` (`injuryName`, `avgRecoveryTime`)
VALUE(:injuryNameInput,:avgRecoveryTimeInput);

-- Insert into PlayersHaveCoaches based on selected playerName and coachName

Insert INTO PlayersHaveCoaches(playerID,coachID) 
VALUES ((SELECT playerID FROM Players WHERE playerName = :playerNameSelected),(SELECT coachID FROM Coaches WHERE coachName = :coachNameInput));

-- Insert into PlayersHaveInjuries based on selected playerName and coachName

Insert INTO PlayersHaveInjuries(playerID,injuryID)
VALUES ((SELECT playerID FROM Players WHERE playerName = :playerNameSelected),(SELECT injuryID FROM Injuries WHERE injuryName = :injuryNameInput));

-- Insert into PlayersHaveEquipments based on selected playerName and equipment type
Insert INTO PlayersHaveEquipments(playerID,equipmentID)
VALUES ((SELECT playerID FROM Players WHERE playerName = :playerNameSelected),(SELECT equipmentID FROM Equipments WHERE type = :typeInput));

-- Update information for a player based on input player ID

UPDATE Players SET playerName = :playerNameUpdateInput, jerseyNum = :jerseyNumUpdateInput, height = :heightUpdateInput, position= :positionUpdateInput, score= :scoreUpdateInput WHERE playerID = :playerIDUpdateInput;

-- update information for a piece of equipment based on input equipmentID

UPDATE Equipments SET type = :equipmentTypeUpdateInput, condition = :conditionUpdateInput, numOfType = :numOfTypeUpdateInput WHERE equipmentID = equipmentIDUpdateInput;

-- update information for a type of injury based on input injuryID

UPDATE Injuries SET injuryName = :injuryNameUpdateInput, avgRecoveryTime = :avgRecoveryTimeUpdateInput WHERE injuryID = injuryIDUpdateInput;

-- update information for a coach based on input coachID

UPDATE Coaches SET coachName = :coachNameUpdateInput, title = :titleUpdateInput, numOfYearCoachingUpdateInput WHERE coachID = coachIDUpdateInput;

-- Update the coach of a player based on input player ID

UPDATE PlayersHaveCoaches SET coachID = :coachIDMMUpdateInput WHERE playerID = :playerIDMMUpdateInput;

Update PlayersHaveEquipments SET equipmentID =:equipmentIDMMUpdateInput WHERE playerID = :playerIDMMUpdateInput;

Update PlayersHaveInjuries SET injuryID =: injuryIDMMUpdateInput WHERE playerID = :playerIDMMUpdateInput;

-- DELETE from players table based on player ID and playerName

DELETE FROM Players WHERE playerID=:playerIDDeleteInput AND playerName = :playerNameDeleteInput;

-- DELETE from PlayersHaveCoaches table based on playerID and coachID

DELETE FROM PlayersHaveCoaches WHERE playerID = :playerIDMMDeleteInput AND coachID = :coachIDMMDeleteInput;

-- DELETE from PlayersHaveInjuries table based on playerID and injuryID

DELETE FROM PlayersHaveInjuries WHERE playerID = :playerIDMMDeleteInput AND injuryID = :injuryIDMMDeleteInput;

-- Delete from PlayersHaveEquipments table based on playerID and equipmentID

DELETE FROM PlayersHaveEquipments WHERE playerID = :playerIDMMDeleteInput AND equipmentID = :equipmentIDMMDeleteInput;


-- Add playerName and coachName columns to PlayersHaveCoaches table
ALTER TABLE PlayersHaveCoaches
ADD COLUMN playerName VARCHAR(255),
ADD COLUMN coachName VARCHAR(255);

-- Add playerName and injuryName columns to PlayersHaveInjuries table
ALTER TABLE PlayersHaveInjuries
ADD COLUMN playerName VARCHAR(255),
ADD COLUMN injuryName VARCHAR(255);

-- Add playerName and type columns to PlayersHaveEquipments table
ALTER TABLE PlayersHaveEquipments
ADD COLUMN playerName VARCHAR(255),
ADD COLUMN type VARCHAR(30);


-- Update existing records in PlayersHaveCoaches with player and coach names
UPDATE PlayersHaveCoaches PHC
JOIN Players P ON PHC.playerID = P.playerID
JOIN Coaches C ON PHC.coachID = C.coachID
SET PHC.playerName = P.playerName, PHC.coachName = C.coachName;


-- Update existing records in PlayersHaveInjuries with player and injury names
UPDATE PlayersHaveInjuries PHI
JOIN Players P ON PHI.playerID = P.playerID
JOIN Injuries I ON PHI.injuryID = I.injuryID
SET PHI.playerName = P.playerName, PHI.injuryName = I.injuryName;

-- Update existing records in PlayersHaveEquipments with player name and equipment type
UPDATE PlayersHaveEquipments PHE
JOIN Players P ON PHE.playerID = P.playerID
JOIN Equipments E ON PHE.equipmentID = E.equipmentID
SET PHE.playerName = P.playerName, PHE.type = E.type;

DELIMITER //
CREATE TRIGGER update_playershavecoaches_coachname AFTER UPDATE ON Coaches
FOR EACH ROW
BEGIN
    UPDATE PlayersHaveCoaches
    SET coachName = NEW.coachName
    WHERE coachID = NEW.coachID;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_playershavecoaches_playername AFTER UPDATE ON Players
FOR EACH ROW
BEGIN
    UPDATE PlayersHaveCoaches
    SET playerName = NEW.playerName
    WHERE playerID = NEW.playerID;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_playershaveinjuries_injuryname AFTER UPDATE ON Injuries
FOR EACH ROW
BEGIN
    UPDATE PlayersHaveInjuries
    SET injuryName = NEW.injuryName
    WHERE injuryID = NEW.injuryID;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_playershaveinjuries_playername AFTER UPDATE ON Players
FOR EACH ROW
BEGIN
    UPDATE PlayersHaveInjuries
    SET playerName = NEW.playerName
    WHERE playerID = NEW.playerID;
END;
//
DELIMITER ;

DELIMITER //

CREATE TRIGGER update_playershaveequipments_type AFTER UPDATE ON Equipments
FOR EACH ROW
BEGIN
    UPDATE PlayersHaveEquipments
    SET type = NEW.type
    WHERE equipmentID = NEW.equipmentID;
END;
//

CREATE TRIGGER update_playershaveequipments_playername AFTER UPDATE ON Players
FOR EACH ROW
BEGIN
    UPDATE PlayersHaveEquipments
    SET playerName = NEW.playerName
    WHERE playerID = NEW.playerID;
END;
//

DELIMITER ;