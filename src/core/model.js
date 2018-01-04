class BaseModel {

  listeners = { }

  constructor(fields) {
    this.attrs = {
      ...fields,
    }
  }

  setAttr(key, value, silence=false) {
    this.attrs[key] = value
    if (!silence)
      this.trigger('update', key, value)
    return this.attrs
  }

  getAttr(key) {
    this.trigger('get', key, this.attrs[key])
    return this.attrs[key]
  }

  getAttrs() {
    this.trigger('getAll', this.attrs)
    return this.attrs
  }

  listen(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [] 
    }
    this.listeners[eventName].push(fn)
  }

  trigger(eventName, key, value) {
    const list = this.listeners[eventName]
    list.forEach((fn) => {
      fn(key, this.attrs[key])
    })
  }

}

export default BaseModel
