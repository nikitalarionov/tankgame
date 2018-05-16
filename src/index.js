import Game from 'core/game.ts'
import { testLevel1 } from 'core/level'

const initTestEnvirotment = function() {
  const game = window.game = new Game()
  game.setCanvasEl()
  game.loadLevel({fn: testLevel1}, 'test-1')
  game.start()
}

document.addEventListener('DOMContentLoaded', function() {
  initTestEnvirotment()
})

// TODO READ PERFOMANCE TIPS
// https://www.html5rocks.com/en/tutorials/canvas/performance/
