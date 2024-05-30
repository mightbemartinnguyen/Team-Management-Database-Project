# Team Management Database Project

Project created by Quinn Hoffman and Martin Nguyen as the final project for the CS340 Introduction to Database course for Winter 2024.

## Executive Summary

Our project evolved from the initial proposal of managing player, coach, and equipment data for the OSU football team. Initially, we planned five entities: Players, Coaches, Injuries, Equipment, and Games. Based on peer reviews, we refined our design, removing redundant entities and improving database relationships and attributes. 

## Overview

Managing large groups of people can be challenging. The Oregon State University football team has 99 players, 34 coaches, over 1188 pieces of equipment, and 13 injuries. We propose a database-driven web application to manage Players, Coaches, Equipment, and Injuries, streamlining the management process and improving efficiency.

## Database Outline

- **Players**: Records player details with relationships to Coaches, Equipment, and Injuries.
- **Coaches**: Records coach details with relationships to Players.
- **Equipments**: Records details of equipment with relationships to Players.
- **Injuries**: Records injury details with relationships to Players.
- **Intersection Tables**: Manage M:M relationships between Players, Coaches, Equipments, and Injuries.

## ER Diagram

[Include ER Diagram here]

## Schema

[Include Schema here]

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

[Include screenshot of the Index Page]

### Players Page

[Include screenshot of the Players Page]

### Equipments Page

[Include screenshot of the Equipments Page]

### Coaches Page

[Include screenshot of the Coaches Page]

### Injuries Page

[Include screenshot of the Injuries Page]

### PlayersHaveCoaches Page

[Include screenshot of the PlayersHaveCoaches Page]

### PlayersHaveInjuries Page

[Include screenshot of the PlayersHaveInjuries Page]

### PlayersHaveEquipments Page

[Include screenshot of the PlayersHaveEquipments Page]
