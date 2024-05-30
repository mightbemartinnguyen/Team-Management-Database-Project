-- Database SQL File for Group 83

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop all tables to ensure that duplicates do not happen
DROP TABLE IF EXISTS `Players`;
DROP TABLE IF EXISTS `Coaches`;
DROP TABLE IF EXISTS `Equipments`;
DROP TABLE IF EXISTS `Injuries`;
DROP TABLE IF EXISTS `PlayersHaveCoaches`;
DROP TABLE IF EXISTS `PlayersHaveInjuries`;

-- Players table: holds all information about the players

CREATE OR REPLACE TABLE `Players` (
    `playerID` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `playerName` VARCHAR(50) NOT NULL,
    `jerseyNum` INT UNIQUE NOT NULL,
    `height` VARCHAR(5) NOT NULL,
    `weight` INT NOT NULL,
    `position` VARCHAR(30) NOT NULL,
    `score` INT NOT NULL,
    PRIMARY KEY (`playerID`)
);

-- Insert statements for starter data for Players

INSERT INTO `Players` (`playerName`, `jerseyNum`, `height`, `weight`, `position`, `score`)
VALUES 
('Lebron James', 11, '72', 220, 'Linebacker', 98),
('Godzilla', 99, '200', 400, 'Quarterback', 100),
('Stephen Curry', 30, '66', 180, 'Wide Receiver', 87),
('Tom Hardy', 6, '60', 170, 'Wide Receiver', 79);

-- Coaches Table: holds all relevant information about the Coaches

CREATE OR REPLACE TABLE `Coaches` (
    `coachID` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `coachName` VARCHAR(50) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `numOfYearCoaching` INT NOT NULL,
    PRIMARY KEY (`coachID`) 
);

-- Insert statements for started data for Coaches table

INSERT INTO `Coaches` (`coachName`, `title`, `numOfYearCoaching`)
VALUES 
('Jamison Hardy', 'Head Coach', 12),
('Bobby Dean', 'Defense Coordinator', 8),
('Nurman Harwell', 'Tight-Ends Coach', 6),
('Dan McNarson', 'Offense Coordinator', 10),
('Steven Wilson', 'Running Backs Coach', 9);

-- Equipments table: holds all relevant information about Equipments

CREATE OR REPLACE TABLE `Equipments` (
    `equipmentID` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `type` VARCHAR(30) NOT NULL,
    `condition` INT NOT NULL,
    `numOfType` INT NOT NULL,
    `replacementCost` FLOAT NOT NULL,
    PRIMARY KEY (`equipmentID`)
);

-- Insert statements for starter data for Equipments

INSERT INTO Equipments (type, `condition`, numOfType, replacementCost)
VALUES 
('Helmet',100, 25, 2000),
('Uniform',95, 52, 100),
('Shoes', 75,45, 150),
('Ball', 100,10, 50),
('Mouth Guard', 83,130, 10);


-- Injuries Table: holds all relevant information about Injuries

CREATE OR REPLACE TABLE `Injuries` (
    `injuryID` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `injuryName` VARCHAR(100),
    `avgRecoveryTime` FLOAT NOT NULL,
    PRIMARY KEY (`injuryID`)
);

-- Insert Statements for Starter Data for Injuries

INSERT INTO `Injuries` (`injuryName`, `avgRecoveryTime`)
VALUES 
('Sprained Ankle', 2),
('Turf Toe', 1),
('Concussion', 4),
('ACL Tear', 13),
('Dislocation', 3);

-- PlayersHaveCoaches: Intersection table between Players and Coaches, facilitates M:M relationship

CREATE OR REPLACE TABLE `PlayersHaveCoaches` (
    `playerID` INT,
    `coachID` INT,
    PRIMARY KEY (`playerID`, `coachID`), -- Primary Key is combination of coachID and playerID
    FOREIGN KEY (`playerID`) REFERENCES `Players`(`playerID`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`coachID`) REFERENCES `Coaches`(`coachID`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Insert Statements for PlayersHaveCoaches starter data

INSERT INTO `PlayersHaveCoaches` (`playerID`, `coachID`)
VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 3),
(4, 4);

-- PlayersHaveInjuries: Intersection table between Players and Injuries, facilitates M:M relationship

CREATE OR REPLACE TABLE `PlayersHaveInjuries` (
    `playerID` INT,
    `injuryID` INT,
    PRIMARY KEY (`playerID`, `injuryID`), -- Primary Key is combination of injuryID and playerID
    FOREIGN KEY (`playerID`) REFERENCES `Players`(`playerID`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`injuryID`) REFERENCES `Injuries`(`injuryID`) ON UPDATE CASCADE ON DELETE CASCADE 
);

-- Insert Statements for PlayersHaveInjuries starter data

INSERT INTO `PlayersHaveInjuries` (`playerID`, `injuryID`)
VALUES
(1, 1),
(2, 2),
(3, 2),
(3, 3),
(1, 4);

-- PlayersHaveEquipments: Intersection table between Players and Equipments, facilitates M:M relationship

CREATE OR REPLACE TABLE `PlayersHaveEquipments`(
    `playerID` INT,
    `equipmentID` INT,
    PRIMARY KEY (`playerID`,`equipmentID`),  -- Fix: Use `equipmentID` instead of `injuryID`
    FOREIGN KEY (`playerID`) REFERENCES `Players`(`playerID`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`equipmentID`) REFERENCES `Equipments`(`equipmentID`) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO `PlayersHaveEquipments` (`playerID`, `equipmentID`)
VALUES
(1, 1),
(2, 2),
(3, 2),
(3, 3),
(1, 4);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
