# Team Management Database Project

Project created by Quinn Hoffman and Martin Nguyen as the final project for the CS340 Introduction to Database course for Winter 2024.

## Executive Summary

  Our Project was initially planned with the idea of creating a system for managing player,
coach, and equipment data for the OSU football team, we have gone through multiple evolutions
from the initial proposal. We initially planned to have 5 entities, Players, Coaches, Injuries,
Equipment, and a now-deleted Games entity. The first round of peer reviews had us add the
count attributes to Coaches, Injuries, and Equipment. We also fixed typos and added some details
in the outline.
  By the time we reached our second draft, we decided to remove the Games entity, finding
it a bit redundant. We also split Equipments into 2 entities, an Equipments entity and an
EquipmentDetails entity, which shared a 1:M relationship to record each piece of equipment and
the specifics of those pieces. We again added more attributes and fixed more mistakes in the
outline. The EquipmentDetails entity would later be removed since this caused a partial
dependency between players and equipment, but we would keep the 1:M relationship.
  For our third draft and peer reviews, the only major changes we made were to change the
relationship between the Players and Equipments tables to an M:M relationship, this time adding
some modifications to the intersection table to avoid a partial dependency that caused us to
remove the table in the first place. Subsequent peer reviews would focus more on the refinement
of the database and user interface, with the main structure of the project being mainly set in stone
by now. Some improvements would include the intersection table to the outline, enhancements to
the SQL files, or small QOL updates to the user interface. Reflecting on the peer review process,
it’s clear that the feedback helped find blind spots and areas of improvement, especially when we
were bouncing around several ideas about which entities to use .

## Overview

  Managing large groups of people can be a costly challenge for companies. The
Oregon State University football team has 99 players on its current roster, 34 coaches, 6
types of equipment with over 1188 pieces to be divided among the players, and 13
injuries of varying severity. Therefore, we propose a database-driven web application that
management can use to keep track of Players, Coaches, Equipment, and Injuries. This
system allows management to easily access information on their players: who they’re
coached by, what games they played, what equipment they have been assigned, and the
injuries that they have. With this database, it will help streamline, keep track of players
and their equipment. It will be easier to manage the roster of coaches and players, track
down missing pieces of gear that cost hundreds of dollars, and show what injuries they
have.


## Database Outline

### Players

Records the details of players within the team:
- `playerID`: int, unique, not NULL, PK, auto_increment
- `playerName`: varChar(50), not NULL
- `jerseyNum`: int, unique, not NULL
- `height`: int, not NULL
- `weight`: int, not NULL
- `position`: varChar(30), not NULL
- `score`: int(100), not NULL
- Relationships:
  - M:M with Coaches with `coachID` and `playerID` as foreign keys inside of the intersection table `PlayersHaveCoaches`
  - 1:M with `PlayersHaveEquipments` with `playersID` as an FK inside of `PlayersHaveEquipments`
  - M:M with Injuries with `injuryID` and `playerID` as FKs inside intersection table `PlayersHaveInjuries`

### Coaches

Records the details of coaches within the team:
- `coachID`: int, unique, not NULL, PK, auto_increment
- `coachName`: varChar(50), not NULL
- `title`: varChar(50), not NULL
- `yearsCoaching`: int, not NULL
- Relationships:
  - M:M with Players with `coachID` and `playerID` as foreign keys inside of the intersection table `PlayersHaveCoaches`

### PlayersHaveCoaches

Intersection table between Players and Coaches:
- `playerID`, FK
- `coachID`, FK
- Relationships:
  - 1:M with Players with `playerID` as an FK inside of `PlayersHaveCoaches`
  - M:1 with Coaches with `coachID` as an FK inside of `PlayersHaveCoaches`

### Equipments

Records details of each piece of equipment associated with a player:
- `equipmentID`: int, unique, not NULL, PK, auto_increment
- `type`: varChar(30), not NULL
- `numOfType`: int, not NULL
- `replacementCost`: float, not NULL
- `condition`: int, not NULL
- Relationships:
  - 1:M with `PlayersHaveEquipments` with `equipmentID` as an FK inside of `PlayersHaveEquipments`

### PlayersHaveEquipments

Intersection table between Players and Equipments:
- `playerID`, FK
- `equipmentID`, FK
- Relationships:
  - 1:M with Players with `playerID` as an FK inside `PlayersHaveEquipments`
  - 1:M with Equipments with `equipmentID` as an FK inside `PlayersHaveEquipments`

### Injuries

Records injuries sustained by each player:
- `injuryID`: int, PK, unique, auto_increment
- `injuryName`: varChar(100)
- `avgRecoveryTime`: float, not NULL
- Relationships:
  - M:M with Players with `injuryID` and `playerID` as FKs inside intersection table `PlayersHaveInjuries`

### PlayersHaveInjuries

Intersection table between Players and Injuries:
- `playerID`, FK
- `injuryID`, FK
- Relationships:
  - 1:M with Players with `playerID` as an FK inside `PlayersHaveInjuries`
  - 1:M with Injuries with `injuryID` as an FK inside `PlayersHaveInjuries`

## ER Diagram

![ER Diagram](screenshots/ERDiagram.png)
## Schema

![Schema](screenshots/Schema.png)
## Example Data

### Players

| playerID | playerName    | jerseyNum | height | weight | score | position   |
|----------|---------------|-----------|--------|--------|-------|------------|
| 1        | Lebron James  | 11        | 72     | 220    | 98    | Linebacker |
| 2        | Godzilla      | 99        | 200    | 400    | 100   | Quarterback|
| 3        | Stephen Curry | 30        | 66     | 180    | 87    | Wide Receiver|
| 4        | Tom Hardy     | 6         | 60     | 170    | 79    | Wide Receiver|

### Coaches

| coachID | coachName     | title               | yearsCoaching |
|---------|---------------|---------------------|---------------|
| 1       | Jamison Hardy | Head Coach          | 12            |
| 2       | Bobby Dean    | Defense Coordinator | 8             |
| 3       | Nurman Harwell| Tight-Ends Coach    | 6             |
| 4       | Dan McNarson  | Offensive Coordinator| 10            |
| 5       | Steven Wilson | Running Backs Coach | 9             |

### PlayersHaveCoaches

| playerID | coachID |
|----------|---------|
| 1        | 1       |
| 2        | 2       |
| 2        | 3       |
| 3        | 3       |
| 4        | 4       |

### Injuries

| injuryID | injuryName    | avgRecoveryTime |
|----------|---------------|-----------------|
| 1        | Sprained Ankle| 2               |
| 2        | Turf Toe      | 1               |
| 3        | Concussion    | 4               |
| 4        | ACL tear      | 13              |
| 5        | Dislocation   | 3               |

### PlayersHaveInjuries

| playerID | injuryID |
|----------|----------|
| 1        | 1        |
| 1        | 4        |
| 2        | 2        |
| 3        | 2        |
| 3        | 3        |

### Equipments

| equipmentID | type        | numOfType | replacementCost | condition |
|-------------|-------------|-----------|-----------------|-----------|
| 1           | Helmet      | 25        | 2000            | 100       |
| 2           | Uniform     | 52        | 100             | 95        |
| 3           | Shoes       | 45        | 150             | 75        |
| 4           | Ball        | 10        | 50              | 100       |
| 5           | Mouth Guard | 130       | 10              | 83        |

### PlayersHaveEquipments

| playerID | equipmentID |
|----------|-------------|
| 1        | 1           |
| 2        | 2           |
| 2        | 3           |
| 3        | 3           |
| 4        | 4           |

## URL to HTML

[http://flip3.engr.oregonstate.edu:2121/](http://flip3.engr.oregonstate.edu:2121/)

## Screenshots of UI

### Index Page

![Index Page](screenshots/homepage.png)

### Players Page

![Players Page](screenshots/Players.png)

### Equipments Page

![Equipments Page](screenshots/Equipment.png)

### Coaches Page

![Coaches Page](screenshots/Coaches.png)

### Injuries Page

![Injuries Page](screenshots/Injuries.png)

### PlayersHaveCoaches Page

![PlayersHaveCoaches Page](screenshots/Playerhavecoaches.png)
### PlayersHaveInjuries Page

![PlayersHaveInjuries Page](screenshots/playershaveinjuries.png)

### PlayersHaveEquipments Page

![PlayersHaveEquipments Page](screenshots/PlayersHaveEquipments.png)
