import { getCanvasEl } from 'lib/utils'

// TODO MOVE TO UTILS
const drawFPS = function (ctx: any, value: any, x: number, y: number, color:any) {
  ctx.fillStyle = color || 'black'
  ctx.font = '20px Helvetica'
  ctx.fillText(String(Math.round(value)), x + 20, y - 5)
}

export default class Game {
    private reqId: number;

    static getCanvasCtx(): any {
        throw new Error("Method not implemented.");
    }

    maxFps = 100

  listeners: any[] = []

  state = {
    paused: false
  }

  time = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  }
    private fps: any;
    private readonly frameDuration: number;
    private lastPausedTime: number;
    private canvasEl: any;
    private ctx: CanvasRenderingContext2D;
    private lastLoopTime: number;
    private currentLevel: any;
    private paused: any;
    private dt: any;
    private mouse: any;
    private canvas: any;

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

  setCanvasEl(canvas:any) {
    if (!canvas) {
      this.canvasEl = getCanvasEl()
    }
    else if (canvas) {
      this.canvasEl = canvas
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
    this.ctx = Game.getCanvasCtx()
  }

  addListeners() {
    // Event Listeners
    addEventListener('mousemove', event => {
      this.mouse.x = event.clientX
      this.mouse.y = event.clientY
    })

    addEventListener('resize', () => {
      this.canvas.width = innerWidth
      this.canvas.height = innerHeight
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
      this.time.seconds = (this.lastLoopTime / 1000)
    }
  }

  update() {
    if (!this.paused) {
      this.currentLevel.update(this)
    }
  }

  loadLevel(parameters: { fn: any }) {
      let fn = parameters.fn;
    this.currentLevel = fn(this)
  }

  render() {
    const c = this.getCtx()
    c.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)

    this.currentLevel.render(this)
    drawFPS(this.getCtx(), this.fps, innerWidth - 50, 25, 'black')
  }

  start() {
    if (!this.state.paused)
      this.play()
  }

}

