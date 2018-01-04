import commands from 'lib/commands'

export class CommandQueue {
  
  constructor(target) {
    this.queue = []
    this.target = target || null
  }

  getFirst() {
    return this.queue[0]
  }

  get length() {
    return this.queue.length
  }

  pop() {
    const result = this.queue.shift()
    if (this.queue.length > 0) {
      const current = this.getFirst()
      if (current.getStatus() === 'idle') {
        current.run.apply(current, current.args)
      }
    }
    return result
  }

  update() {
    if (this.queue.length > 0) {
      this.getFirst().update()
    }
  }

  clear() {
    this.queue = []
  }

  log() {
    console.log(this.queue)
  }

  push(name) {
    const command = new Command(this.target, name)
    const args = Array.prototype.slice.call(arguments, 1)
    if (this.length === 0) {
      command.run.apply(command, args)
    } else {
      command.args = args
    }
    this.queue.push(command)
    return command
  }

}

export class Command {
  
  constructor(target, name) {
    if (!name) {
      throw new Error('name field is required by Command constructor');
    }
    this.statuses = {
      0 : 'idle',
      1 : 'is-running',
      2 : 'paused',
      3 : 'completed',
      4 : 'aborted',
      5 : 'waiting',
    }
    this.target = target
    this.currentStatus = 0
    this.name = name
    this.state = {}
  }

  // method is used?
  getName() {
    return this.name
  }

  run() {
    const text = `Cant find command with name: ${this.name}`
    const job = commands[this.name]
    if (!job) { 
      throw new Error(text)
    }
    this.job = job
    this.currentStatus = 1
    this.job.init.apply(this, arguments)
  }

  // method not used
  stop() {
    this.currentStatus = 2
  }

  // method not used
  end() {
    this.currentStatus = 4
  }

  getStatus() {   
    return this.statuses[this.currentStatus]
  }

  update() {
    if (this.job && this.job.update) {
      this.job.update.call(this)
    }
  }

  complete() {
    this.currentStatus = 3
    this.target.queue.pop()
  }

}