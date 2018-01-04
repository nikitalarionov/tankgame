export default {
  'moveTo': {
    init: function(x, y, relative) {
      if (typeof(x) !== 'number' || typeof(y) !== 'number') {
        return new Error('x, y is requried')
      }
      const state = this.state
      const target = this.target
      if (relative) {
    		state.position = {
    		  x: target.x + x,
    		  y: target.y + y,
    		}
      } else {
		    state.position = {x, y}
      }
    },
    update: function() {
      const state = this.state
      const target = this.target
      state.endX = target.position.x === state.position.x
      state.endY = target.position.y === state.position.y

      if (state.endX && state.endY) {
        this.complete()
      } else {
        target.moveTo(state.position)
      }
    }
  },

  fire: {
    init: function(x, y) {
      if (x < -1 || x > 1) {
        throw new Error('x has not normalized value')
      }
      if (y < - 1 || y > 1) {
        throw new Error('y has not normalized value')
      }
      if (x !== undefined && y !== undefined) {
        this.target.dirVec.x = x
        this.target.dirVec.y = y
      }
    },
    update: function() {
      this.target.fire()
      this.complete()
    }
  }

}