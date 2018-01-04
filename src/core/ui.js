
class Panel {

  constuctor(el, options) {
    const {x, y, width, height, title, children } = options
    this.tpl = options.tpl
    this.x = x
    this.y = y
    this.model = options.model
    this.width = width
    this.height = height
    this.title = title
    this.model.listen('update', this.render())
  }

  setModel(model) {
    this.model = model
  }

  getModel() {
    return this.model
  }

  render() {
    this.el.insertAdjacentHTML('beforeBegin', this.tpl(this.model.getAttrs()))
  }
}

export default {
  Views: {
    Panel,
  }
}
