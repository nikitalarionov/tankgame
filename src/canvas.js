import { testLevel1 } from 'core/level'
import { getCanvasEl } from 'lib/utils'

// TODO MOVE TO UTILS
const drawFPS = function(ctx, value, x, y, color) {
  ctx.fillStyle = color || 'black'
  ctx.font = '20px Helvetica'
  ctx.fillText(Math.round(value), x + 20, y - 5)
}

// TODO MOVE TO core/game.js
class Game {

  maxFps = 100

  listeners = []

  state = {
    paused: false
  }

  time = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  }

  constructor() {
    this.frameDuration = 1 / this.maxFps
  }

  pause() {
    this.state.paused = true
    this.lastPausedTime = Date.now()
  }

  play() {
    this.state.paused = false
    this.loop()
  }

  onResize() {
    // IMPLEMENT
  }

  onMouseMove() {
    // IMPLEMENT
  }

  setCanvasEl(canvas) {
    if (!canvas) {
      this.canvasEl = getCanvasEl()
    }
    else if (canvasEl) {
      this.canvasEl = canvasEl
    }
  }

  getDt() {
    return this.dt
  }

  getCtx() {
    this.ctx = this.canvasEl.getContext('2d')
    return this.ctx
  }

  setContext() {
    this.ctx = this.getCanvasCtx()
  }

  addListeners() {
    // Event Listeners
    addEventListener('mousemove', event => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    })

    addEventListener('resize', () => {
      canvas.width = innerWidth
      canvas.height = innerHeight
      this.start()
    })
  }

  loop() {
    this.reqId = requestAnimationFrame(() => this.loop())
    const now = performance.now()
    if (!this.lastLoopTime) {
      this.lastLoopTime = now
      return false
    }
    this.dt = (now - this.lastLoopTime) / 1000
    if (this.dt > this.frameDuration) {
      this.fps = 1 / this.dt
      this.update()
      this.render()
      this.lastLoopTime = now - (
        this.dt % this.frameDuration
      )
      this.time.seconds = (this.lastLoopTime / 1000).toFixed(2)
    }
  }

  update() {
    if (!this.paused) {
      this.currentLevel.update(this)
    }
  }

  loadLevel(fn) {
    this.currentLevel = fn(this)
  }

  render() {
    const c = this.getCtx()
    c.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)

    this.currentLevel.render(this)
    drawFPS(this.getCtx(), this.fps, innerWidth - 50, 25)
  }

  start() {
    if (!this.state.paused)
      this.play()
  }

}

// TODO rename file to index.js

const initTestEnvirotment = function() {
  const game = window.game = new Game()
  game.setCanvasEl()
  game.loadLevel(testLevel1, 'test-1')
  game.start()
}

document.addEventListener('DOMContentLoaded', function() {
  initTestEnvirotment()
})

// TODO READ PERFOMANCE TIPS
// https://www.html5rocks.com/en/tutorials/canvas/performance/
