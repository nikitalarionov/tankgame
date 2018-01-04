import {throttle, getRandomNum, distance} from 'lib/utils'
import { CommandQueue } from 'lib/command'
import {StackFSM} from 'core/fsm'
import Victor from 'victor'
import knn from 'rbush-knn'

/**
 * TODO: Move to utils
 * Проверяет столкнулись ли два прямоугольника
 * @param  {BaseObject} a 
 * @param  {BaseObject} b 
 * @return {Boolean} - результат (столкнулись ли они?)
 */
const checkCollision = function(a, b) {
  let res = false
  if (a.x < b.x + b.w  && a.x + a.w  > b.x &&
    a.y < b.y + b.h && a.y + a.h > b.y) {
    res = true
  }
  return res
}

class BaseObject {

  velocity = 300
  life = 100

  display = true

  state = {
    moving: false
  }

  direction = {
    up: false,
    down: false,
    left: false,
    right:false,
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }

  get minX() {
    return this.position.x
  }

  get minY() {
    return this.position.y
  }

  get maxX() {
    return this.position.x + this.w
  }

  get maxY() {
    return this.position.x + this.h
  }

  dirVec = new Victor(0, 0)

  constructor(options) {
    let {color, position, rect, remove } = options
    this.color = color
    if (typeof(remove) === 'function') {
      this.remove = remove.bind(this)
    }
    this.position = position || new Victor(0, 0)
    if (!rect) {
      rect = this.getDefaultSize()
    }
    this.rect = rect
    const { w, h } = rect
    if (w && h) {
      this.w = w
      this.h = h
    }
    this.queue = new CommandQueue(this)
  }

  remove() {
    // empty
  }

  getDefaultSize() {
    return {
      w: 40,
      h: 40
    }
  }

  getRect() {
    return this.rect
  }

  getPosition() {
    return this.position
  }

  setRect(rect) {
    this.rect = rect
  }

  setPosition(position) {
    this.position = position
  }

  setDirection(dir) {
    this.dirVec.x = dir.x
    this.dirVec.y = dir.y
    this.onUpdateDirection()
  }

  onUpdateDirection() {

  }

  update() {
    if (this.life <= 0) {
      this.remove()
    }
    if (this.queue.length) {
      this.queue.update()
    }
    this.onUpdate()
  }

  onUpdate() {
  }

  onRender() {
  }

  draw() {
    if (!this.display)
      return false
    const c = game.getCtx()
    c.beginPath()
    c.rect(
      this.position.x,
      this.position.y,
      this.w,
      this.h
    )
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    this.onRender()
  }

  hide() {
    this.display = false
  }

  show() {
    this.display = true
  }

  destroy() {
    this.hide()
  }

  moveBy() {
    const dt = game.getDt()
    const step = this.velocity * dt
    if (this.direction.up) {
      this.position.y -= step
    }
    if (this.direction.down) {
      this.position.y += step
    }
    if (this.direction.left) {
      this.position.x -= step
    }
    if (this.direction.right) {
      this.position.x += step
    }
  }

  move(dir) {
    const dt = game.getDt()
    const stepX = (this.velocity * dt) * dir.x
    const stepY = (this.velocity * dt) * dir.y
    this.position.x += stepX
    this.position.y += stepY
  }

  moveTo(vec) {
    const dt = game.getDt()
    const x = this.position.x 
    const y = this.position.y

    /** Init */

    if (!this.state.movement) {
      const startX = x
      const startY = y
      const endX = vec.x
      const endY = vec.y
      const distance = Math.sqrt(
        Math.pow(endX - startX, 2) + 
        Math.pow(endY - startY, 2),
      )

      let directionX = Math.round((endX - startX) / distance)
      let directionY = Math.round((endY - startY) / distance)

      const data = {
        endX,
        endY,
        startX,
        startY,
        distance,
        directionX,
        directionY,
      }

      this.state.movement = data
      this.dirVec.x = directionX
      this.dirVec.y = directionY
    }

    /** Update */

    if (this.state.movement) {
      const {
        endX, endY, 
        startX, startY, 
        directionX, directionY,
        distance
      } = this.state.movement

      this.position.x += directionX * this.velocity * dt
      this.position.y += directionY * this.velocity * dt

      const remainDistance = Math.sqrt(
        Math.pow(x - startX, 2) +
        Math.pow(y - startY, 2)
      )

      if (remainDistance >= distance) {
        this.position.x = endX
        this.position.y = endY
        this.state.movement = false
      }
    }

  }

}

export class LevelBlock extends BaseObject {

  constructor(options) {
    super(options)
  }

}

export class Bullet extends BaseObject {

  velocity = 500
  lifeTime = 5 // sec
  damage = 25
  type = 'single'
  collided = false

  constructor(options) {
    super(options)
    this.owner = options.owner
    setTimeout(() => {
      this.outdate = true
    }, this.lifeTime * 1000)
  }

  onHit() {
    // TODO implement
  }

  onMiss() {
    // TODO implement
  }

  onUpdate() {
    this.move(this.dirVec)
    const results = knn(game.tree, this.position.x, this.position.y, 3)
    results.forEach((target, idx) => {
      if (this !== target && this.owner !== target) {
        if (checkCollision(this, target)) {
          if (!this.collided) {
            this.collided = true
            if (target && typeof target.damage === 'function') {
              target.damage(this.damage, this.type)
            }
          }
        }
      }
    })
  }

}

export class Tank extends BaseObject {

  life = 100
  bullets = 5
  velocity = 35
  tower_angle = 180
  tower_velocity = 2
  bulletbuffer = []

  components = []
  gunDirection = new Victor(0, 0)

  constructor(options) {
    super(options)
    const { color, headColor, gunColor } = options
    this.color = color || '#4691ff'
    this.radius = this.w *  2
    this.headColor = headColor || 'black'
    this.gunColor = gunColor || 'white'
    this.restore = false
    this.setGunAngle()
  }

  damage(val, type) {
    if (this.life > 0) {
      this.life -= val
    } else {
      this.life = 0
    }
  }

  setGunAngle() {
    this.gunAngle = 90
  }

  setHeadColor(color) {
    this.headColor = color
  }

  addComponent(tankComponent) {
    this.components.push(tankComponent)
  }

  removeComponent(tankComponent) {
    const idx = this.components.indexOf(tankComponent)
    if (idx > -1)
      this.components.splice(idx, 1)
  }

  initPlayer() {
    this.enableControls()
    this.player = true
  }

  showReloadText() {
    const c = game.getCtx()
    const text = `Reloading...`
    c.fillStyle = 'black'
    c.font = '14px Helvetica'
    c.fillText(text, innerWidth / 2, innerHeight / 2)
  }

  updateComponents() {
    this.components.forEach((component) => {
      component.update()
    })
  }

  drawHealthBar(x, y) {
    const hp = `hp: ${this.life}`
    const c = game.getCtx()
    c.fillStyle = 'black'
    c.font = '18px Helvetica'
    c.fillText(hp, x, y)
  }

  drawBulletCountLabel(x, y) {
    const count = this.bullets
    const labelTxt = `Bullets: ${count}`
    const c = game.getCtx()
    c.fillStyle = 'black'
    c.font = '18px Helvetica'
    c.fillText(labelTxt, x, y)
  }  

  // ADD fire MIXIN
  fire() {
    const time = Date.now()
    if (this.bullets === 0) {
      this.state.reloading = true
      return false
    }

    const directionY = this.dirVec.y > 0 || this.dirVec.y < 0

    const bullet = new Bullet({
      rect: directionY ? { w: 3, h: 8 } : { w: 8, h: 3 },
      color: 'red',
      owner: this,
    })

    bullet.dirVec = {...this.dirVec}
    bullet.setPosition(
      new Victor(
        this.gunDirection.x,
        this.gunDirection.y
      )
    )

    bullet.state.moving = true
    this.bulletbuffer.push(bullet)
    game.tree.insert(bullet)
    this.bullets--
  }

  moveGun(keys) {
    // LEFT, RIGHT
    if (keys.right) {
      // TODO USE TRIGONOMETRY
      this.tower_angle += tower_velocity
    }
    if (keys.left) {
      // TODO USE TRIGONOMETRY
      this.tower_angle -= tower_velocity
    }
  }

  updateBullets() {
    this.bulletbuffer.forEach((bullet, idx) => {
      if (bullet.outdate || bullet.collided) {
        game.tree.remove(bullet)
        this.bulletbuffer.shift()
      } else {
        bullet.update()
      }
    })
    if (this.bullets <= 0 && !this.state.reloading) {
      this.state.reloading = true
      setTimeout(() => {
        this.bullets += 5
        this.state.reloading = false
      }, 1500)
    }
  }

  drawGun(c) {
    const { x, y } = this.dirVec
    if (x === 0 && y === -1) {
      this.gunAngle = 270
    } else if (x === 0 && y === 1) {
      this.gunAngle = 90
    } else if (x === 1 && y === 0) {
      this.gunAngle = 0
    } else if (x === -1 & y === 0) {
      this.gunAngle = 180
    }
    const radian = Math.PI / 180 * this.gunAngle
    this.headHalfWidth = this.headWidth / 2
    this.headHalfHeight = this.headHeight / 2
    this.gunPosition = new Victor(
      this.headX + this.headHalfWidth,
      this.headY + this.headHalfWidth
    )
    const length = this.radius / 3
    const x1 = this.headX + this.headHalfWidth + length * Math.cos(radian)
    const y1 = this.headY + this.headHalfHeight + length * Math.sin(radian)
    this.gunDirection.x = x1
    this.gunDirection.y = y1
    c.beginPath()
    c.strokeStyle = this.gunColor
    c.moveTo(this.gunPosition.x, this.gunPosition.y)
    c.lineTo(x1, y1)
    c.lineWidth = 2
    c.stroke()
    c.lineWidth = 1
    c.closePath()
  }

  drawHead(c) {
    const margin = 30
    this.headX = this.x + margin / 2
    this.headY = this.y + margin / 2
    this.headWidth = this.w - margin
    this.headHeight = this.h - margin
    c.beginPath()
    c.fillStyle = this.headColor
    c.fillRect(
      this.headX,
      this.headY, 
      this.headWidth,
      this.headHeight
    )
    c.closePath()
  }

  drawBody(c) {
    c.beginPath()
    c.rect(
      this.position.x,
      this.position.y,
      this.w,
      this.h
    )
    c.fillStyle = this.color
    c.fill()
    c.closePath()    
  }

  draw() {
    if (!this.display)
      return false
    const c = game.getCtx()
    this.drawBody(c)
    this.drawHead(c)
    this.drawGun(c)
    this.onRender()
  }

  onRender() {
    if (this.player) {
      const bulletLabelX = innerWidth - 80
      const bulletLabelY = innerHeight - 10
      this.drawBulletCountLabel(bulletLabelX, bulletLabelY)
      this.drawHealthBar(5, innerHeight - 10)
    }
    if (this.state.reloading && this.player) {
      this.showReloadText()
    }
    this.bulletbuffer.forEach((b) => {
      b.draw()
    })
  }

  onUpdate() {
    this.moveBy()
    this.updateBullets()
    this.updateComponents()
  }

  onKeyPress(directionName, type) {
    const pressed = type === 'keydown' ? true : false
    this.direction[directionName] = pressed ? true : false
  }

  enableControls() {
    const events = ['keydown', 'keyup']
    const listener = (e) => {
      const { keyCode, type } = e
      const directions = {
        38: {
          name: 'up',
          vec: new Victor(0, -1),
          axis: 'y',
        },
        40: {
          name: 'down',
          vec: new Victor(0, 1),
          axis: 'y',
        },
        37: {
          name: 'left',
          vec: new Victor(-1, 0),
          axis: 'x',
        },
        39: {
          name: 'right',
          vec: new Victor(1, 0),
          axis: 'x',
        }
      }
      const direction = directions[keyCode]
      if (direction) {
        const { name, vec, axis } = direction
        this.dirVec = vec
        this.onKeyPress(name, type)
      }
      if (keyCode === 32 && type === 'keyup') {
        if (!this.state.reloading) {
          if (!this.lastFireTime) {
            this.lastFireTime = game.lastLoopTime
          }
          if (game.lastLoopTime - this.lastFireTime > 1000) {
            this.fire()
            this.lastFireTime = null
          }
        }
      }
    }
    events.forEach((name) => {
      addEventListener(name, listener)
    })
  }
}

export class EnemyTank extends Tank {

  velocity = 50
  scanRange = 600
  unit = true

  // add commands stack
  // if we have command in stack
  // and this command have some state
  // pop stack command and apply state

  constructor(options) {
    super(options)
    this.fsm = new StackFSM()
    this.initCPU()
    this.scanner = throttle(this.scanLine, 1000, this)
  }

  initCPU() {
    this.cpu = true
    setTimeout(() => {
      this.fsm.pushState(() => this.stateScout())
    }, getRandomNum(1, 5) * 1000)
  }

  onUpdate() {
    this.updateBullets()
    this.fsm.update()
  }

  scanLine() {
    console.log(Date.now())
  }

  stateChangeWeapon(type, nextState) {
    // changes weapon type
    // for next attack
  }

  stateMoveTo(position, nextState) {
    // moveTo position
    // use pathfinding algorythm
    // when got position
    // pushNextState
  }

  stateAvoidAttack() {
    // while beign in stateScout
    // if enemy bullet is detected on line
    // change line
    // if enemy not detected fire in same direction
    // if enemy detected fire at enemy
    // if hp is low runAway
  }

  stateAttack() {
    // if enemy detected
    // fire at enemy position
    // then scan for enemy bullet attacks
    // if bullets detected avoid attacks
    // if no bullets change position (UP, TOP, LEFT, RIGHT)
  }

  stateDoGroup() {
    // find free group of objects
    // join
    // listen to group ai commands

    // group features:

    // positions - few objects can stay in Positions

    // position - triangle
    //  t t
    // t t t
    //  t t

    // position - square
    // t t t t
    // t t t t
    // t t t t

    // group commands
    // objects can order commands

    // regroup - group idx will be resorted
    // after that objects handle moveTo(position)
    // attackAll - all at one direction
    // all objects will attack at one direction

    // attackSquarePosition - each obj attack in one point
    // of squared space

    // holdposition - objects will hold different positions
    // for n times of attacks

    // scanSquare - each objects will scan for enemy
    // if enemy is attack - save direction X OR Y
    // make scanSquare results with array of lines
    // trigger next state of GroupController
    // attackSquarePosition
    //
    // heal(obj) or repair - if obj type can heal
    // it will heal other obj
    // it will push stateRepair(obj)
    //
    // defend(obj)
    // will cover building with some around positions
    //
    //
  }

  stateScout() {
    if (!this.queue.length) {
      const num = getRandomNum(3, 4) + 1
      const range = getRandomNum(50, 100) + 1
      this.queue.push('moveTo', -1 * range * num, 1, true)
      this.queue.push('moveTo', 1 * range * num, 1, true)
    }
    // TODO refactor
    // add timer object
    // use timer object
    if (!this.lastScoutScan) {
      this.lastScoutScan = game.lastLoopTime / 1000
    }
    // TODO refactor
    // add new variables for elapsed time
    // minutes
    // seconds
    // hours
    if (game.lastLoopTime / 1000 - this.lastScoutScan > 1.5) {
      knn(game.tree, this.x, this.y, 10).map((obj) => {
        // TODO refactor
        // add method to util isDirectionTheSame
        if (obj.player) {
          const fov = 100
          const sameDirectionX = obj.x < this.x && this.dirVec.x == -1
            || obj.x > this.x && this.dirVec.x == -1
          const sameDirectionY = obj.y < this.y && this.dirVec.y == 1
            || obj.y > this.y && this.dirVec.y == 1
          const closerToY = this.y - fov < obj.y && this.y + fov > obj.y
          const closerToX = this.x - fov < obj.x && this.x + fov > obj.y
          if (sameDirectionX && closerToY || sameDirectionY && closerToX) {
            // TODO add weapon queue
            this.fire()
            const newX = this.dirVec.x * (obj.x / 10)
            const newY = 0
            this.queue.push('moveTo', newX, newY, true)
          }
        }
      })
      this.lastScoutScan = null
    }
  }
}

export class Enemy {

  // Tower class will inherit this cls

  // towers features:
  //
  // autocapture
  // if enemy in scan radius
  // it captures enemy position in realtime updates
  //
  // autofire
  //
  // it can autofire if enemy captured
  //
  // helpSignal
  //
  // it can scan for friendly objects
  // to defence self
  //
  // enemy group will be cover tower
  //

}

class Soldier extends Enemy {

  // add pathfinding behavior
  // add fire behavior
  // add repair behavior
  // add group behavior
  //

  // features
  //
  // weapons
  //
  // granade:
  //
  // bazuka:
  //
  // skills:
  //
  // repair tank
  //
  // add mine
  //
  // use artillery
  //
  // it will handle free artillery
  // artillery object has own behavior
  //

}

class Sniper extends Soldier {

  // add enchantent skill behavior

  // features
  //
  // skills:
  //
  // longshoot - anti-armor attack with long reload time
  //
  // captureEnemy - captures enemy with laser

}

// TODO add fire types
//
//
// At one line
//
// single - one shoot in 1 sec
//
// multiple - two shoots in 1 sec
//
// triple - 3 shoots in 1 sec
//
// laser - one shoot in 3 secs
//
// At two lines
//
// single
//
// laser
//
// RocketAOE
//
// aoe rocket - fires down squared space 2x2
//
// Rocket Auto-target
//
// launch rocket that will be hit at enemy
// bahavior:
//
// if it hit closer to enemy at 10px nearly
// it will reduce enemy hp with full damage
//
// if it hit closer to enemy > 10px
// it will has chance to hit 50/50 and damage reduced by 50%
//
//
// Attack with angle direction at Time
//
// if object has captured enemy position and moving
// it will be attack at enemy position with some angle direction
//


// TODO Separate enemy states
//
// fsm for movement, change positions
// will have states:
// state.movement
// state.holdPosition
// state.attackingAtPosition
// state.hasNoPosition
// state.inGroup
// state.runaway
// state.attacking
// state.repairing
//
//

// TODO Tank Behavior enchantments:
//
// 1) With low hp movement speed is reduced
// 2) Tank can by three of types:
//
// Lightweight - small size
// has much movement speed low dmg
//
// MiddleEnd - normal size
// has normal speed, normal dmg
//
// HeavyTank - big size
// has slow movenet speed, big dmg, long reloading
//

// TODO add armor entity
//
// armor logic
//
// if armor easy
//
// if weapon heavy - it will hit lightweight armor by 200% dmg
// if weapon normal - it will hit lightweight armor by 150% dmg
// if weapon easy - it will hit lightweight armor by 80-100% dmg
//
// if armor heavy
// weapon normal hit this armor by 60-80% dmg
// weapon heavy hit this armor by 100% dmg
// weapon easy hit this armor by 30-40% dmg
//
// if armor normal
// weapon normal hit this armor by 100% dmg
// weapon heavy hit this armor by 150% dmg
// weapon easy hit his armor by 60-80% dmg
//
//

// NOTE
// Tower will have heavy armor type
// Soldiers, Snipers will have easy armor type
// Tank - will have normal armor type
// HeavyTank - will have heavy armor type
//

// NOTE
//
// TankTypes
//
// Speed lightweight (lvl 1 - 5)
// Lightweight scout (lvl 1 - 5)
// Normal (lvl 1 - 5)
// Heavy (lvl 1 - 5)
// Boss (lvl 1 -5)
//

// TOWER TYPES
//
// RADAR Type - can capture enemy position for long range
//
// DEFEND Type - can attack enemies
//
// SUPPORT TYPE - can repair nearby objects
//
// BASE TYPE - if it will be destroyed - gameover
//
//


// NOTE DESTROY OF TANKS BEHAVIOR
//
// drop loot
// - enchatments
// - gold
// - bomb
// - mine
//
//

// TANK PLAYER SKILLS
//
// toggleWeaponType
// reloadWeaponBullets
// buyFriendTank - if stay near with base building
// buyFriendSoldier - if stay near with base building
// repair - if stay with mechanics building or has repair item
// pickup object - pick enchatment or gold
// pickup gold - auto behavior will pick up nearly gold automated
//
