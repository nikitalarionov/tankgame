import { LevelBlock } from 'core/object'

// Utility Functions
export function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getCanvasEl = function() {
  const canvas = document.querySelector('canvas')
  canvas.width = innerWidth
  canvas.height = innerHeight
  return canvas
}

export const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * max - min) + min
}

export function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))

}

export const lvlBlockFactory = (blockType, i, j) => {
  const colors = ['grey', 'green', 'blue']
  let size = { w: 50, h: 50 }
  return new LevelBlock({
    color: colors[blockType],
    position: {
      x: size.w * j,
      y: size.h * i,
    },
    rect: {
      ...size,
    },
  })
}

export const debounce = function(f, ms, context = {}) {
  let timer = null
  return function (...args) {
    const onComplete = () => {
      console.log(args)
      f.apply(context, args)
      timer = null
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(onComplete, ms)
  };
}


export const throttle = function(func, ms, ctx) {

  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(ctx, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
