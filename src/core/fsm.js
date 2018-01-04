
export class StackFSM {

  stack = []

  popState() {
    return this.stack.pop()
  }

  pushState(state) {
    if (this.getCurrentState() !== state) {
      this.stack.push(state)
    }
  }

  getCurrentState() {
    return this.stack.length > 0 ?
      this.stack[this.stack.length - 1] : null 
  }

  update() {
    const state = this.getCurrentState()
    if (state !== null) {
      state()
    }
  }

}
