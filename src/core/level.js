import { Tank, EnemyTank } from 'core/object'
import { Panel } from 'core/ui'
import rbush from 'rbush'
import Victor from 'victor'

import {
  lvlBlockFactory,
  distance,
} from 'lib/utils'

const testLevel1Map = [
 [1,1,1,1,1,1,1,1,1,1,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,2,0,0,0,0,1],
 [1,1,1,1,1,1,1,1,1,1,1]
]

export const testLevel1 = function(game) {
  let obj

  const level = Object.create({
    map: testLevel1,
    objects: [],
    game: game,
  })

  // TODO add to utils
  const removeFromList = (obj, list) => {
    const idx = list.indexOf(obj)
    if (idx > - 1) {
      list.splice(idx, 1)
    }
  }

  const removeObj = function() {
    removeFromList(this, game.objects)
    removeFromList(this, level.objects)
    game.tree.remove(this)
  }

  level.update = function() {
    this.objects.forEach((obj) => {
      obj.update()
    })
  }

  level.render = function() {
    this.objects.forEach((obj) => {
      obj.draw()
    })
  }

  level.testMap = testLevel1Map
  const rows = level.testMap.length - 1
  level.rows = rows
  let tank
  for (let i = 0; i <= rows; i++) {
    const cells = level.testMap[i].length - 1
    level.cells = cells
    for (let j = 0; j <= cells; j++) {
      let blockType = level.testMap[i][j]
      if (blockType === 2) {
        blockType = 1
        tank = new Tank({
          remove: removeObj,
          color: '#03a9f4',
          position: new Victor(
            51 * j, 51 * i
          ),
        })
      }
      obj = lvlBlockFactory(blockType, i, j)
      level.objects.push(obj)
    }
  }

  const enemyTank = new EnemyTank({
    remove: removeObj,
    color: 'green',
    position: new Victor(
      innerWidth - 100,
      innerHeight / 2
    ),
  })
  const enemyTank2 = new EnemyTank({
    remove: removeObj,
    color: 'red',
    position: new Victor(
      innerWidth - 100,
      (innerHeight / 2) - 50
    ),
  })
  const enemyTank3 = new EnemyTank({
    remove: removeObj,
    color: 'black',
    headColor: '#03a9f4',
    position: new Victor(
      innerWidth - 100,
      (innerHeight / 2) - 100
    ),
  })
  const enemyTank4 = new EnemyTank({
    remove: removeObj,
    color: 'silver',
    headColor: 'black',
    position: new Victor(
      innerWidth - 100,
      (innerHeight / 2) - 150
    ),
  })
  const enemyTank5 = new EnemyTank({
    remove: removeObj,
    color: 'aqua',
    headColor: 'blue',
    position: new Victor(
      innerWidth - 100,
      (innerHeight / 2) + 150
    ),
  })  
  const enemyTank6 = new EnemyTank({
    remove: removeObj,
    color: 'orange',
    headColor: 'black',
    position: new Victor(
      innerWidth - 100,
      (innerHeight / 2) + 50
    ),
  })
  const enemyTank7 = new EnemyTank({
    remove: removeObj,
    color: 'brown',
    headColor: 'black',
    position: new Victor(
      innerWidth - 100,
      (innerHeight / 2) + 100
    ),
  })  

  window.enemyTank = enemyTank

  tank.initPlayer()
  game.objects = [
    tank, 
    enemyTank, 
    enemyTank2, 
    enemyTank3,
    enemyTank4,
    enemyTank5,
    enemyTank6,
    enemyTank7
  ]
  game.tree = rbush().load(game.objects)
  level.objects = level.objects.concat(game.objects)
  return level
}
