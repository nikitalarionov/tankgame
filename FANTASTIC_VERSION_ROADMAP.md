SPRINT 2

1. Научить танки стрелять вверх, вниз (в режиме разведки)
2. Научить танки менять направление разведки (смотреть влево, вправо, вниз, вверх)
- если в одном направлении не найден противник, то менять его
3. Добавить тестовые уровни где игрок (слева, наверху, справо, снизу) а противник с противоположной стороны
4. Add Healt bar for objects
5. Add timer class
6. Отрефакторить код чтобы использовать таймер где нужно
7. Добавить настройку показывать ли hp bars

Version will be 0.02a

SPRINT 3

1. Add command wait (duration)
2. Add command stop - moving
3. Add keys to rotate gun
4. Добавить команду rotateGun
4. Добавить вражеским танкам FOV с углом обзора
5. Добавить debug режим для FOV обзора
6. Вражеские танки должны поворачивать пушку в сторону противника и стрелять

Version will be 0.03a

SPRINT 4

1. Improve movement, check collision while movement

- Не давать танкам наезжать на друг друга
- Не давать танкам уезжать за пределы видимого пространства

2. Add particles effect when enemy attacked by bullet

3. Create two base groups, player, AI, AI2

Добавить объектам принадлежность к группам

4. Use groups (attack, scan)

Атаковать могут друг-друга только противоположные группы

5. Add evade command to scout behavior

Если цель заметила что идет атака, она должна уметь уклоняться

Version will be 0.04a

SPRINT 5

1. Research about scene class
2. Research about layer class
3. Research about actors class
4. Research about Director class (Changes scenes)
5. See cocos2dx classes

Version doesn't change

SPRINT 6

1. Add sprite for tank
2. Add sprite for tankHead
3. Add sprite for tankGun
4. Add sprites for level map objects
5. Add explosion animation

Version will be 0.05a

SPRINT 7 

1. Research about using TMX tiles in game
2. Use tmx tiles in game
3. Add layer entity in game (чтобы рисовать поверх)
4. Refactor level class
5. Add two beautifull maps

Version will be 0.1b

SPRINT 8

1. Read data from tiles objects
2. Block movement on objects when collision happens
3. Implement pathfinding algorythm
4. Integrate pathfinding 
5. Move around blocked object

Version will be 0.2b

SPRINT 9

1. ADD SPAWN points to tiles data
2. ADD SPAWN COMMANDS to tiles data
3. REFACTOR: UPDATE LEVELS, CODE
4. REFACTOR: MAKE HUD OR UI CLASS (Рисовать HP, патроны, SCORE)
5. ADD GAME OVER MESSAGE

Version will be 0.3b

SPRINT 10

1. ADD TANK TYPES
2. ADD WEAPON TYPES (COMPONENTS?)

Version will be 0.4b

SPRINT 11

1. ADD Sound to attack action
2. ADD Sound to explosion action
3. USE TWICE BULLET WEAPON
4. ADD ARMOR ABILITY FOR TANKS TYPES

Version will be 0.5b

SPRINT 12

1. Add camera to levels
2. Follow camera to player
3. ADD OFFSETS FOR camera

Version will be 0.6b

SPRINT 13

1. Add engine component
2. Add AI (SCOUT BY PATHFINDING ALL MAP)
3. If hp is lower reduce speed

SPRINT 14

1. Add wave event
2. End wave event
3. Add first boss
4. Add to first boss few attacks types
5. Implement smarter AI for boss

Version will be 0.7b

SPRINT 15 

UPGRADE GAME ENGINE (NEED TO APROOVE)

1. Add Scene class
2. Add Director class
3. Add Actor class
4. Add Scene Manager class

Version will be 0.8b

SPRINT 16

1. ADD LOADING BAR
2. ADD SPLASH SCREEN
3. ADD MAIN MENU (REACT)

Version will be 0.9b

SPRINT 17

1. ADD UI CHOOSE TANK (REACT)
2. ADD UI SELECT LEVEL (REACT)
3. ADD UI END LEVEL SCREEN 

Version will be 0.91b

SPRINT 18

1. ADD 1-6 LEVELS
2. ADD Second BOSS

Version will be 0.92b

SPRINT 19

1. Implement statistics in game
2. ADD STATISTICS UI WINDOW AT END OF LEVEL

Version will be 0.93b

SPRINT 20 - ADD TANK UPGRADE FEATURES

1. - 3. ADD UI FOR UPGRADES
4. USE LOCALSTORAGE TO SAVE SESSION

Version will be 0.94b

SPRINT 21 - Implement UPGRADES

1. weapon damage
2. speed of tank
3. armor of tank
4. hp of tank

Version will be 0.95b

SPRINT 22 - Add weapon types in UPGRADES

1. single
2. double
3. triple

Version will be 0.96b

SPRINT 23 - IMPROOVE ARCADE MODE

1. ADD LEVELS 7-12
2. ADD THIRD BOSS
3. ADD AUTHOR MESSAGE SCREEN, FINALY SCREEN
4. ADD MINIMAP

Version will be 0.97b

SPRINT 24 - Integrate SERVER FOR SAVE SESSION

1. Add nodejs express server
3. ADD REGISTER UI WINDOW

Version will be 0.98b

SPRINT 25 PROGRESS STATISTICS

1. SAVE USER PROGRESS (LEVELS, UPGRADES)
2. SAVE USER STATISTICS 
3. SHOW USER STATISTICS

Version will be 0.99b

SPRINT 26 FINAL

1. Fix bugs
2. Add tests
3. Add more art, sound, screens, improove UI
4. Add icons

Version will be 1.0


########### Version 2 (MULTIPLAYER) #########

SPRINT 1

1. Backend add ROOM ENTITY
2. Backend add ROOM HASHTAG
3. Add websockets
4. Use websockets
5. Backend connect to the room
6. Backend get active rooms

SPRINT 2

1. ADD UI TO SEE ROOMS
2. ADD UI TO JOIN IN ROOMS
3. Backend add player-tank entity
4. Backend add tank bullet entity

SPRINT 3 Add chat component

(USE REDIS FOR IT)

1. Implement chat component on client
2. Implement chat on backend
3. ADD CHAT LOG

SPRINT 4 ALLOW BACKEND CONTROLS OBJECTS

1. SEND DATA ABOUT POSITION
2. SEND DATA ABOUT ACTION
3. SEND DATA ABOUT COLLISION
4. BACKEND SEND ONE PLAYER DATA TO ROOM
5. Client GET DATA FROM ROOM ABOUT OTHER PLAYER

SPRINT 5 

1. Update client to use data from server to draw multiplayer enemy
2. CLIENT-BACKEND: ADD SEE RANGE FOR PLAYERS
3. CLIENT: update UI (players count, leader board)

SPRINT 6

1. SPAWN ENCHATMENTS ON MULTIPLAYER LVL
2. ADD ARENA TYPE ROOM (2 players)

SPRINT 7

1. ADD DEADMATCH TYPE ROOM (1 - 10 players)
2. ADD MAP (DESERT)
3. ADD MAP (FOREST)
4. ADD MAP (WINTER)

Version will be 2.0

########### Version 3 (MULTIPLAYER EXTENDED) #########

VERSION FUTURES:

PLAYER SHOP
PLAYER UPGRADES
PLAYER PROFILE
PLAYER STATISTICS
ADD MANY TYPES OF TANKS
PLAYER TANK CUSTOMIZATION
ADD ACHIEVEMENTS

########### Version 4 (MULTIPLAYER EXTENDED) #########

MVP TYPES ROOMS (WAVES 1 - 10), (BOOS)
EQUIPMENT (WEAPONS, ARMOR TYPES, WHEELS, FEATURES)
RARE EQUIPMENT (BULLETS, WEAPONS, TANKS)
ARENA REPLAYS
DEADMATCH REPLAYS
TOURNAMENTS
TOURNAMENTS DASHBOARD

########### Version 5 (TANK RACING - MULTIPLAYER EXTENDED) #########

RACING MODE (ONLY RACE, WITH WEAPONS)
RACING MAPS
RACE STATISTICS
RACE REPLAY

====== Backlog ======

Add component to tank (engine)

РАЗРАБОТКА ДВИГАТЕЛЯ:

rps - обороты в секунду

// для объяснения
// min rps 0
// max rps 6000

// при max rps - развивается самая максимальная скорость
// передач - не будет в первой версии

// набирать rps надо быстро 
// чтобы набрать обороты надо использовать коэффициент (константа)
// например velocity 35, rps 0, const = 50
// грубый расчет:

// за первую секунду будет разгон
// 35 * 50 = 1750 rps (100%)
// за вторую секунду будет разгон
// 35 * 50 * 0.8 = 1400 rps (80%)
// за третью секунду будет разгон 
// 35 * 50 * 0.6 = 1050
// на третей секунде оборотов будет 
// 1750 + 1400 + 1050 = 4200
// за четвертую секунду будет разгон
// 35 * 50 * 0.45 = 785~ (4200 + 785) = 5000~
// за пятую секунду будет разгон 
// 35 * 50 * 0.30 = 525 (5000 + 525) = 5525
// за шестую секунду будет разгон 525 / 2 = 275
// 5525 + 275 = 5800

// Процент разгона от оборотов двигателя
// с 0 до 2к (100%)
// с 2к по 3к (80%)
// с 3к по 4к (60%)
// c 4к по 5к (45%)
// с 5к по 5.5k (30%)
// c 5.5k по 6k (15%)

// тормоз скидывает за 1 сек 1800 оборотов 
// чтобы затормозить с 6000 надо почти 3 секунды для полной остановки

// В БУДУЩЕМ!:
// при максимальной скорости будет уменьшаться угол поворота
// невозможно будет сменить вектор движения
// если нельзя будет затормозить, будет урон по хп